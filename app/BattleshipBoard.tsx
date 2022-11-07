import { Board, CellState } from "./Board";

type Props = {
  board: Board;
  isCurrentTurn: boolean;
  callback?: (x: number, y: number) => void;
};

export default function BattleshipBoard({
  board,
  isCurrentTurn,
  callback,
}: Props) {
  return (
    <div className={`grid grid-cols-10 ${!isCurrentTurn ? "opacity-50" : ""}`}>
      {board.grid.map((row, x) =>
        row.map((cell, y) => {
          let buttonColor;

          switch (cell) {
            case CellState.miss:
              buttonColor = "bg-black";
              break;
            case CellState.hit:
              buttonColor = "bg-red-500";
              break;
            default:
              buttonColor = "bg-gray-300";
              break;
          }

          return (
            <button
              onClick={callback ? () => callback(x, y) : () => {}}
              key={`${x},${y}`}
              className={`${buttonColor} w-10 h-10 border`}></button>
          );
        })
      )}
    </div>
  );
}
