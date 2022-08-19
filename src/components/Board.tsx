import { useState, useEffect } from "react";
import useRotation from '../hooks/useRotation';
import styled from "styled-components";
import Tile from "./Tile";

const gridNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

const BoardFoundation = styled.section<{onClick: () => void}>`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 150px));
  grid-template-rows: repeat(4, minmax(100px, 150px));
`
type TileProps = {
  squares: string,
  row: number,
  column: number,
  gridRow: number,
  gridColumn: number
}

type Matrix = (string | undefined) [][];

const testBoard: Matrix = [
  ['y', 'yx', 'y', 'yx', 'y', 'y', 'r', 'r'],
  ['y', 'y', 'y', 'y', 'y', 'y', 'r', 'rx'],
  ['o', 'o', 'o', 'o', 'y', 'yx', 'yx', 'y'],
  ['o', 'ox', 'ox', 'o', 'y', 'y', 'y', 'y'],
  ['g', 'gx', 'b', 'b', 'b', 'b', 't', 't'],
  ['gx', 'g', 'b', 'b', 'b', 'bx', 'tx', 't'],
  ['t', 't', 'b', 'bx', 'b', 'b', 't', 't'],
  ['tx', 't', 'b', 'b', 'bx', 'b', 't', 'tx']
];

export default function Board() {
  
  const [board, rotateBoard] = useRotation(testBoard);
  const [tiles, setTiles] = useState<TileProps[] | null>(null);

  useEffect(() => {
  
    const tileArr: TileProps[] = [];
    
    for (let y=0; y < board[0].length; y += 2) {
      for (let x=0; x< board.length; x += 2) {
        const tile: TileProps = {
          squares: [board[y][x], board[y][x+1], board[y+1][x+1], board[y+1][x]].join('_'),
          row: y,
          column: x,
          gridRow: gridNumbers[y],
          gridColumn: gridNumbers[x]
        };
        tileArr.push(tile);
      }
    }
    setTiles(tileArr);

  }, [board])

  return (
    <>
      { tiles
          ? <BoardFoundation onClick={rotateBoard}>
              {tiles.map((tile: TileProps, index: number) => {
              return <Tile key={index} squares={tile['squares']} row={tile.row} column={tile.column} gridRow={tile.gridRow} gridColumn={tile.gridColumn} />
              })}
            </BoardFoundation>
          : null
      }
    </>
  )
}