"use client";

import { useState } from "react";
import BattleshipBoard from "./BattleshipBoard";
import { Board } from "./Board";
import { generateAvailableCoordinates } from "./utils";

type Props = {};

const GRID_SIZE = 10;

export default function Home({}: Props) {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerBoard, setPlayerBoard] = useState(new Board(GRID_SIZE));
  const [aiBoard, setAIBoard] = useState(new Board(GRID_SIZE));
  const [availableCoordinates, setAvailableCoordinates] = useState(
    generateAvailableCoordinates(GRID_SIZE)
  );
  const [winner, setWinner] = useState<string | null>(null);

  const handleAIBoardClicked = (x: number, y: number) => {
    //If (!gamestate) placeboat();
    if (!isPlayerTurn || winner) return;

    const [shouldTurnChange, newBoard] = aiBoard.attackCell(x, y);
    setAIBoard(newBoard);

    if (newBoard.ships <= 0) {
      setWinner("Player");
      return;
    }

    if (shouldTurnChange) {
      setIsPlayerTurn(false);
      handleAITurn();
    }
  };

  const handleAITurn = () => {
    const index = Math.floor(Math.random() * availableCoordinates.length);

    setTimeout(() => {
      const [x, y] = availableCoordinates[index];
      setAvailableCoordinates([
        ...availableCoordinates.slice(0, index),
        ...availableCoordinates.slice(index + 1),
      ]);

      const [shouldTurnChange, newBoard] = playerBoard.attackCell(x, y);
      setPlayerBoard(newBoard);

      if (newBoard.ships <= 0) {
        setWinner("AI");
        return;
      }

      if (shouldTurnChange) {
        setIsPlayerTurn(true);
      } else {
        handleAITurn();
      }
    }, 750);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {winner && <p className="text-4xl font-bold">{`${winner} won!`}</p>}
      <div className="flex gap-40">
        <div>
          <p className="text-center font-bold mb-4">Player Board</p>
          <BattleshipBoard board={playerBoard} isCurrentTurn={!isPlayerTurn} />
        </div>
        <div>
          <p className="text-center font-bold mb-4">AI Board</p>
          <BattleshipBoard
            board={aiBoard}
            isCurrentTurn={isPlayerTurn}
            callback={handleAIBoardClicked}
          />
        </div>
      </div>
    </div>
  );
}
