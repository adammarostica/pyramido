import { useState } from "react";
import styled from "styled-components";
import InteractiveTile from "./InteractiveTile";
import Blank from "./Blank";

type BoardProps = {
  activeDomino: string[][];
  activeDominoRotation: number;
};

type TileProps = {
  squares: string[];
  row: number;
  column: number;
  validPlacements?: string[];
};

const testBoard: TileProps[][] = [
  [
    { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
    { squares: [], row: 0, column: 0, validPlacements: ['right'] },
    { squares: [], row: 0, column: 0, validPlacements: ['right'] },
    { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
    { squares: [], row: 0, column: 0, validPlacements: ['right'] },
    { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
  ],
  [
    { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
    { squares: ["o", "o", "o", "ox"], row: 0, column: 1 },
    { squares: ["y", "y", "yx", "y"], row: 0, column: 1 },
    { squares: [], row: 0, column: 0, validPlacements: [] },
    { squares: ["r", "rx", "r", "r"], row: 0, column: 1 },
    { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
  ],
  [
    { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
    { squares: ["ox", "o", "o", "o"], row: 0, column: 1 },
    { squares: ["y", "y", "yx", "y"], row: 0, column: 1 },
    { squares: ["y", "yx", "y", "y"], row: 0, column: 1 },
    { squares: ["y", "y", "yx", "y"], row: 0, column: 1 },
    { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
  ],
  [
    { squares: [], row: 0, column: 0, validPlacements: ['right'] },
    { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
    { squares: [], row: 0, column: 0, validPlacements: ['bottom'] },
    { squares: ["b", "b", "bx", "b"], row: 0, column: 1 },
    { squares: [], row: 0, column: 0, validPlacements: ['right', 'bottom'] },
    { squares: [], row: 0, column: 0, validPlacements: [] },
  ],
  [
    { squares: [], row: 0, column: 0, validPlacements: [] },
    { squares: [], row: 0, column: 0, validPlacements: [] },
    { squares: [], row: 0, column: 0, validPlacements: ['right'] },
    { squares: [], row: 0, column: 0, validPlacements: ['right'] },
    { squares: [], row: 0, column: 0, validPlacements: [] },
    { squares: [], row: 0, column: 0, validPlacements: [] },
  ],
];

const BoardFoundation = styled.section<{ columns: number; rows: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    minmax(100px, 1fr)
  );
  grid-template-rows: repeat(${(props) => props.rows}, minmax(100px, 1fr));
  border: 1px solid black;
`;

export default function InteractiveBoard({
  activeDomino,
  activeDominoRotation,
}: BoardProps) {
  const [board, setBoard] = useState<TileProps[][]>(testBoard);

  return (
    <BoardFoundation columns={board[0].length} rows={board.length}>
      {board.map((row: TileProps[], rowIndex: number) => {
        return row.map((tile: TileProps, columnIndex: number) => {
          if (tile.validPlacements) {
            return (
              <Blank
                key={`${rowIndex}-${columnIndex}`}
                activeDomino={activeDomino}
                activeDominoRotation={activeDominoRotation}
                row={rowIndex}
                column={columnIndex}
                validPlacements={tile.validPlacements}
                setBoard={setBoard}
              />
            );
          } else {
            return (
              <InteractiveTile
                key={`${rowIndex}-${columnIndex}`}
                squares={tile.squares.join("_")}
                row={rowIndex}
                column={columnIndex}
              />
            );
          }
        });
      })}
    </BoardFoundation>
  );
}
