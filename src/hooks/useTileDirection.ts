import { TileProps } from "../data/testBoard"

const horizontalDominoDirectionPreference = [
  {
    direction: "right",
    rowOffset: 0,
    columnOffset: 1,
    rotationOffset: 0,
  },
  {
    direction: "left",
    rowOffset: 0,
    columnOffset: -1,
    rotationOffset: 0,
  },
  {
    direction: "down",
    rowOffset: 1,
    columnOffset: 0,
    rotationOffset: 90,
  },
  {
    direction: "up",
    rowOffset: -1,
    columnOffset: 0,
    rotationOffset: 90,
  },
]

const verticalDominoDirectionPreference = [
  {
    direction: "down",
    rowOffset: 1,
    columnOffset: 0,
    rotationOffset: 0,
  },
  {
    direction: "up",
    rowOffset: -1,
    columnOffset: 0,
    rotationOffset: 0,
  },
  {
    direction: "right",
    rowOffset: 0,
    columnOffset: 1,
    rotationOffset: -90,
  },
  {
    direction: "left",
    rowOffset: 0,
    columnOffset: -1,
    rotationOffset: -90,
  },
]

export default function useTileDirection(board: TileProps[][], row: number, column: number, activeDominoRotation: number): [string, number] {
  
  function getTileStatus(row: number, column: number) {
    try {
      return board[row][column].status;
    } catch {
      return 'error';
    }
  }
  
  function whereDoesThisPieceFit(): [string, number] {
    const statusOfThisTile = getTileStatus(row, column);
    let direction = 'none';
    let rotationOffset = 0;
    
    if (statusOfThisTile === 'adjacent' && (activeDominoRotation === 0 || activeDominoRotation === 180)) {
      horizontalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && (statusOfTileInThisDirection === 'adjacent' || statusOfTileInThisDirection === 'eligible')) {
          direction = pref.direction;
          rotationOffset = pref.rotationOffset;
        }
      });
    } else if (statusOfThisTile === 'eligible' && (activeDominoRotation === 0 || activeDominoRotation === 180)) {
      horizontalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && statusOfTileInThisDirection === 'adjacent') {
          direction = pref.direction;
          rotationOffset = pref.rotationOffset;
        }
      })
    } else if (statusOfThisTile === 'adjacent' && (activeDominoRotation === 90 || activeDominoRotation === 270)) {
      verticalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && (statusOfTileInThisDirection === 'adjacent' || statusOfTileInThisDirection === 'eligible')) {
          direction = pref.direction;
          rotationOffset = pref.rotationOffset;
        }
      });
    } else if (statusOfThisTile === 'eligible' && (activeDominoRotation === 90 || activeDominoRotation === 270)) {
      verticalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && statusOfTileInThisDirection === 'adjacent') {
          direction = pref.direction;
          rotationOffset = pref.rotationOffset;
        }
      });
    } else {
      return ['none', 0];
    }
  
    return [direction, rotationOffset];
  }


  return whereDoesThisPieceFit();

}
