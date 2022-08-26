import { useState, useRef } from "react";
import styled from "styled-components";
import InteractiveTile from "./InteractiveTile";
import Blank from "./Blank";
import testBoard from '../data/testBoard';

type BoardProps = {
  activeDomino: string[][];
  activeDominoRotation: number;
};

type TileProps = {
  status: string;
  squares: string[];
};

// const testBoard: TileProps[][] = [
//   [
//     { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
//   ],
//   [
//     { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
//     { squares: ["o", "o", "o", "ox"], row: 0, column: 1 },
//     { squares: ["y", "y", "yx", "y"], row: 0, column: 1 },
//     { squares: [], row: 0, column: 0, validPlacements: [] },
//     { squares: ["r", "rx", "r", "r"], row: 0, column: 1 },
//     { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
//   ],
//   [
//     { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
//     { squares: ["ox", "o", "o", "o"], row: 0, column: 1 },
//     { squares: ["y", "y", "yx", "y"], row: 0, column: 1 },
//     { squares: ["y", "yx", "y", "y"], row: 0, column: 1 },
//     { squares: ["y", "y", "yx", "y"], row: 0, column: 1 },
//     { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
//   ],
//   [
//     { squares: [], row: 0, column: 0, validPlacements: ['right'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
//     { squares: ["b", "b", "bx", "b"], row: 0, column: 1 },
//     { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
//     { squares: [], row: 0, column: 0, validPlacements: [] },
//   ],
//   [
//     { squares: [], row: 0, column: 0, validPlacements: [] },
//     { squares: [], row: 0, column: 0, validPlacements: [] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right'] },
//     { squares: [], row: 0, column: 0, validPlacements: ['right'] },
//     { squares: [], row: 0, column: 0, validPlacements: [] },
//     { squares: [], row: 0, column: 0, validPlacements: [] },
//   ],
// ];

testBoard[4][4].status = 'orthogonal';
testBoard[4][5].status = 'orthogonal';

const BoardFoundation = styled.section<{ columns: number, rows: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(30px, 1fr)
  );
  grid-template-rows: repeat(${(props) => props.rows}, minmax(30px, 1fr));
  border: 1px solid black;
`;

export default function InteractiveBoard({
  activeDomino,
  activeDominoRotation,
}: BoardProps) {
  const [board, setBoard] = useState<TileProps[][]>(testBoard);
  const lowestTakenRow = useRef(4);
  const highestTakenRow = useRef(4);
  const lowestTakenColumn = useRef(4);
  const highestTakenColumn = useRef(5);
  const maxBoardWidth = useRef(5);
  const maxBoardHeight = useRef(5);

  function checkForNewHighsAndLows(lowestNewRow:number, highestNewRow:number, lowestNewColumn:number, highestNewColumn:number) {
    if (lowestNewRow < lowestTakenRow.current) lowestTakenRow.current = lowestNewRow;
    if (lowestNewColumn < lowestTakenColumn.current) lowestTakenColumn.current = lowestNewColumn;
    if (highestNewRow > highestTakenRow.current) highestTakenRow.current = highestNewRow;
    if (highestNewColumn > highestTakenColumn.current) highestTakenColumn.current = highestNewColumn;
  }

  function isWithinTwoSpacesOfATile(board: TileProps[][], row:number, column:number): boolean {
    let isDiagonal = false;
    const numberOfRows = board.length;
    const numberOfColumns = board[0].length;

    if ((row-1 >=0 && column-1 >= 0 && board[row-1][column-1].status === 'taken')
      || (row+1 < numberOfRows && column+1 < numberOfColumns && board[row+1][column+1].status === 'taken')
      || (row+1 < numberOfRows && column-1 >= 0 && board[row+1][column-1].status === 'taken')
      || (row-1 >= 0 && column+1 < numberOfColumns && board[row-1][column+1].status === 'taken')
      || (row-2 >=0 && board[row-2][column].status === 'taken')
      || (row+2 < numberOfRows && board[row+2][column].status === 'taken')
      || (column-2 >=0 && board[row][column-2].status === 'taken')
      || (column+2 < numberOfColumns && board[row][column+2].status === 'taken')) {
      isDiagonal = true;
    }

    return isDiagonal;
  }

  function isOrthogonallyAdjacentToATile(board: TileProps[][], row: number, column: number): boolean {
    let isOrthogonal = false;
    const numberOfRows = board.length;
    const numberOfColumns = board[0].length;

    if ((row-1 >= 0 && board[row-1][column].status === 'taken')
      || (row+1 < numberOfRows && board[row+1][column].status === 'taken')
      || (column-1 >= 0 && board[row][column-1].status === 'taken')
      || (column+1 < numberOfColumns && board[row][column+1].status === 'taken')) {
        isOrthogonal = true;
    }
    return isOrthogonal;
  }

  function reclassifyBoard(board: TileProps[][]): TileProps[][] {
    const currentBoardWidth = highestTakenColumn.current - lowestTakenColumn.current + 1;
    const currentBoardHeight = highestTakenRow.current - lowestTakenRow.current + 1;
    if (currentBoardWidth === 5) maxBoardHeight.current = 4;
    if (currentBoardHeight === 5) maxBoardWidth.current = 4;
    const widthNeededOnEachSide = (maxBoardWidth.current - currentBoardWidth);
    const heightNeededOnEachSide = (maxBoardHeight.current - currentBoardHeight);
    const columnLowerLimit = lowestTakenColumn.current - widthNeededOnEachSide;
    const columnUpperLimit = highestTakenColumn.current + widthNeededOnEachSide;
    const rowLowerLimit = lowestTakenRow.current - heightNeededOnEachSide;
    const rowUpperLimit = highestTakenRow.current + heightNeededOnEachSide;
    // console.log(columnLowerLimit, columnUpperLimit, rowLowerLimit, rowUpperLimit)
    
    // console.log(`width: ${currentBoardWidth}, height: ${currentBoardHeight}`);
    board.map((row, rowIndex) => {
      return row.map((tile, columnIndex) => {
        const isEligibleForStatusChange = tile.status === 'possible' || tile.status === 'adjacent' || tile.status === 'eligible';
        if (isEligibleForStatusChange) {
          if (rowIndex < rowLowerLimit || rowIndex > rowUpperLimit || columnIndex < columnLowerLimit || columnIndex > columnUpperLimit) {
            tile.status = 'impossible';
          } else if (isOrthogonallyAdjacentToATile(board, rowIndex, columnIndex)) {
            tile.status = 'adjacent';
          } else if (isWithinTwoSpacesOfATile(board, rowIndex, columnIndex)) {
            tile.status = 'eligible';
          }
        }
        return tile;
      });
    });
    
    return board;
  }

  function placeDomino(domino: string[][], row: number, column: number, direction: string): void {
    let newBoard = [...board];
    newBoard[row][column] = { status: 'taken', squares: domino[0] };
    let lowestNewRow = row;
    let highestNewRow = row;
    let lowestNewColumn = column;
    let highestNewColumn = column;
    let secondTileRow = row;
    let secondTileColumn = column;
    switch (direction) {
      case 'up':
        lowestNewRow = row - 1;
        secondTileRow = row - 1;
        break;
      case 'right':
        highestNewColumn = column + 1;
        secondTileColumn = column + 1;
        break;
      case 'down':
        highestNewRow = row + 1;
        secondTileRow = row + 1;
        break;
      case 'left':
        lowestNewColumn = column - 1;
        secondTileColumn = column + 1;
        break;
    }
    newBoard[secondTileRow][secondTileColumn] = { status: 'taken', squares: domino[1] };
    checkForNewHighsAndLows(lowestNewRow, highestNewRow, lowestNewColumn, highestNewColumn);
    newBoard = reclassifyBoard(newBoard);
    setBoard(newBoard);
  }

  // function handlePointerOver(e: any): void {
  //   console.log(e.target);
  // }
  // function handlePointerLeave(e: any): void {
  //   console.log(e.target);
  // }

  return (
    <BoardFoundation columns={board[0].length} rows={board.length}>
      {board.map((row: TileProps[], rowIndex: number) => {
        return row.map((tile: TileProps, columnIndex: number) => {
          if (tile.status === 'taken') {
            return (
              <InteractiveTile
                key={`${rowIndex}-${columnIndex}`}
                squares={tile.squares.join("_")}
                row={rowIndex}
                column={columnIndex}
              />
            );
          } else {
            return (
              <Blank
                board={board}
                key={`${rowIndex}-${columnIndex}`}
                activeDomino={activeDomino}
                activeDominoRotation={activeDominoRotation}
                row={rowIndex}
                column={columnIndex}
                status={tile.status}
                placeDomino={placeDomino}
              />
            );
          }
        });
      })}
    </BoardFoundation>
  );
}
