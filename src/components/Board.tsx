import { useState, useEffect } from "react";
import styled from "styled-components";
import Tile from "./Tile";

const gridNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];


const Heading = styled.h1`
  font-size: 60px;
  color: violetblue;
`

const BoardFoundation = styled.section`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 150px));
  grid-template-rows: repeat(4, minmax(100px, 150px));
`

interface TileProps {
  squares: string,
  row: number,
  column: number,
  gridRow: number,
  gridColumn: number
}


export default function Board(): JSX.Element {

  const [tiles, setTiles] = useState<TileProps[] | null>(null);

  useEffect(() => {
    const boardArr: string[][] = [
      ['y', 'yx', 'y', 'yx', 'y', 'y', 'r', 'r'],
      ['y', 'y', 'y', 'y', 'y', 'y', 'r', 'rx'],
      ['o', 'o', 'o', 'o', 'y', 'yx', 'yx', 'y'],
      ['o', 'ox', 'ox', 'o', 'y', 'y', 'y', 'y'],
      ['g', 'gx', 'b', 'b', 'b', 'b', 't', 't'],
      ['gx', 'g', 'b', 'b', 'b', 'bx', 'tx', 't'],
      ['t', 't', 'b', 'bx', 'b', 'b', 't', 't'],
      ['tx', 't', 'b', 'b', 'bx', 'b', 't', 'tx']
    ];
  
    const tileArr: TileProps[] = [];
  
    for (let y=0; y < boardArr[0].length; y += 2) {
      for (let x=0; x< boardArr.length; x += 2) {
        const tile: TileProps = {
          squares: [boardArr[y][x], boardArr[y][x+1], boardArr[y+1][x+1], boardArr[y+1][x]].join('_'),
          row: y,
          column: x,
          gridRow: gridNumbers[y],
          gridColumn: gridNumbers[x]
        };
        tileArr.push(tile);
      }
    }
    setTiles(tileArr);
  }, [])

  return (
    <>
      <Heading>Hello</Heading>
      { tiles
          ? <BoardFoundation>
              {tiles.map((tile: TileProps, index: number) => {
              return <Tile key={index} squares={tile['squares']} row={tile.row} column={tile.column} gridRow={tile.gridRow} gridColumn={tile.gridColumn} />
              })}
            </BoardFoundation>
          : null
      }
    </>
  )
}