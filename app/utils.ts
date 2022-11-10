import { CellState } from "./Board";

export const generateAvailableCoordinates = (size: number) => {
  const coordinates = [];

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      coordinates.push([x, y]);
    }
  }

  return coordinates;
};




export function checkAvalible(size: number, shape: number[][][], x: number, y: number, order: number, z: number, grid: CellState[][]) {
  //console.log("inide checkAvalible", size, shape, x, y, order)
  if ((((x > 0) && (y) > 0)) && (((x) < size) && ((y) < size))) {
    if (grid[x][y] !== CellState.ship) {
      return 1
    }
  }
  return 0;
}
export function generateAvailablePosititions(size: number, shape: number[][][], grid: CellState[][]) {
  let legal = 1
  let legalpositions = []
  let legalships = []
  let true_x = 0
  let true_y = 0
  let choice = []
  for (let z = 0; z < shape.length; z++) {
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let spin = 0; spin < 4; spin++) {
          legalships = []
          for (let order = 0; order < shape[z].length; order++) {
            if (legal) {
              if (spin == 0) {
                true_x = x + (shape[z][order][0])
                true_y = y + (shape[z][order][1])
              } else if (spin == 1) {
                true_x = y - (shape[z][order][0])
                true_y = x + (shape[z][order][1])
              } else if (spin == 2) {
                true_x = x - (shape[z][order][0])
                true_y = y - (shape[z][order][1])
              } else if (spin == 3) {
                true_x = y + (shape[z][order][0])
                true_y = x - (shape[z][order][1])
              }
              if (legal) {
                legal = checkAvalible(size, shape, true_x, true_y, order, z, grid)
              }
              legalships.push([true_x, true_y])
            }

          }
          if (legal) {
            //console.log("ships", legalships)
            //console.log("the positions",legalpositions)
            legalpositions.push(legalships)
          }
        }
        legal = 1
      }
    }

    choice = legalpositions[Math.floor((legalpositions.length) * Math.random())] //should be 1 dim
    console.log([legalpositions[(legalpositions.length) - 1]])
    console.log("choice", choice)
    //console.log("legal", legalpositions)

    //console.log("choice.lenght", choice.length)
    console.log("order", choice)
    for (let order = 0; order < choice.length; order++) {
      console.log(choice[order][0])
      grid[choice[order][0]][choice[order][1]] = CellState.ship
    }
    console.log("gird", grid)
  }

}



