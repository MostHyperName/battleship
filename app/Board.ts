import { generateAvailableCoordinates } from "./utils";
import { checkAvalible } from "./utils";
import { generateAvailablePosititions } from "./utils";

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
    let shape = [[[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]]];
    let coords = [];

    generateAvailablePosititions(size, shape, this.grid)
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
