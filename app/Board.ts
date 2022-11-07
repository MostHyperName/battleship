import { generateAvailableCoordinates } from "./utils";

export enum CellState {
  empty,
  miss,
  hit,
  ship,
}

export class Board {
  grid: CellState[][];
  ships: number;

  constructor(size: number) {
    this.grid = new Array(size);
    this.ships = Math.floor(size * size * 0.25);

    for (let i = 0; i < size; i++) {
      this.grid[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        this.grid[i][j] = CellState.empty;
      }
    }

    let availableCoordinates = generateAvailableCoordinates(size);

    for (let i = 0; i < this.ships; i++) {
      const index = Math.floor(Math.random() * availableCoordinates.length);
      const [x, y] = availableCoordinates[index];
      availableCoordinates = [
        ...availableCoordinates.slice(0, index),
        ...availableCoordinates.slice(index + 1),
      ];
      this.grid[x][y] = CellState.ship;
    }
  }

  attackCell(x: number, y: number) {
    let shouldChangeTurn;
    let newBoard = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );

    switch (this.grid[x][y]) {
      case CellState.empty:
        newBoard.grid[x][y] = CellState.miss;
        shouldChangeTurn = true;
        break;
      case CellState.ship:
        newBoard.grid[x][y] = CellState.hit;
        newBoard.ships--;
        shouldChangeTurn = false;
        break;
      default:
        shouldChangeTurn = false;
        break;
    }

    return [shouldChangeTurn, newBoard];
  }
}
