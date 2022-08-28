import { useState } from "react";
import styled from "styled-components";
import useOrientation from "../hooks/useOrientation";
import { TileProps } from "../data/testBoard"

const horizontalDominoDirectionPreference = [
  {
    direction: "right",
    rowOffset: 0,
    columnOffset: 1,
  },
  {
    direction: "left",
    rowOffset: 0,
    columnOffset: -1,
  },
  {
    direction: "down",
    rowOffset: 1,
    columnOffset: 0,
  },
  {
    direction: "up",
    rowOffset: -1,
    columnOffset: 0,
  },
]

const verticalDominoDirectionPreference = [
  {
    direction: "down",
    rowOffset: 1,
    columnOffset: 0,
  },
  {
    direction: "up",
    rowOffset: -1,
    columnOffset: 0,
  },
  {
    direction: "right",
    rowOffset: 0,
    columnOffset: 1,
  },
  {
    direction: "left",
    rowOffset: 0,
    columnOffset: -1,
  },
]

type BlankProps = {
  board: TileProps[][];
  activeDomino: string[][];
  activeDominoRotation: number;
  row: number;
  column: number;
  status: string;
  placeDomino: Function;
};

const BlankSquare = styled.div<{ status: string; column: number; row: number }>`
  position: relative;
  outline: 1px solid #00000022;
  aspect-ratio: 1 / 1;
  grid-column: ${(props) => props.column + 1} / span 1;
  grid-row: ${(props) => props.row + 1} / span 1;
  background-color: ${(props) => {
    if (props.status === "impossible") {
      return "slategrey";
    } else if (props.status === "possible") {
      return "lightgrey";
    } else {
      return "white";
    }
  }};
 
`;

const ImgTile = styled.div<{rotation1: number, rotation2: number, direction: string}>`

  img {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: auto;
    display: inline-block;
  }
  .one {
    transform: rotate(${props => props.rotation1}deg);
  }
  .two {
    transform: rotate(${props => props.rotation2}deg);
  }

  ${props => {
    if (props.direction === 'right') {
      return `
        .one {
          transform: rotate(${props.rotation1}deg);
        }
        .two {
          transform: translateX(100%) rotate(${props.rotation2}deg);
          pointer-events: none;
        }
      `
    } else if (props.direction === 'left') {
      return `
        .one {
          transform: translateX(-100%) rotate(${props.rotation1}deg);
          pointer-events: none;
        }
        .two {
          transform: rotate(${props.rotation2}deg);
        }
      `
    } else if (props.direction === 'down') {
      return `
        .one {
          transform: rotate(${props.rotation1 + 90}deg);
        }
        .two {
          transform: translateY(100%) rotate(${props.rotation2 + 90}deg);
          pointer-events: none;
        }
      `
    } else if (props.direction === 'up') {
      return `
        .one {
          transform: translateY(-100%) rotate(${props.rotation1 + 90}deg);
          pointer-events: none;
        }
        .two {
          transform: rotate(${props.rotation2 + 90}deg);
        }
      `
    }
   }}

`

export default function Blank({
  board,
  activeDomino,
  activeDominoRotation,
  row,
  column,
  status,
  placeDomino,
}: BlankProps): JSX.Element {
  function handleClick() {
    placeDomino(activeDomino, row, column, "right");
  }

  const [activePointer, setActivePointer] = useState(false);
  const [imageURL1, rotation1] = useOrientation(activeDomino[0].join('_'));
  const [imageURL2, rotation2] = useOrientation(activeDomino[1].join('_'));
  
  function handlePointerEnter() {
    if (board[row][column].status === 'adjacent' || board[row][column].status === 'eligible') {
      setActivePointer(true);
    }
  }

  function handlePointerLeave() {
    setActivePointer(false);
  }

  function getTileStatus(row: number, column: number) {
    try {
      return board[row][column].status;
    } catch {
      return 'error';
    }
  }
  
  function whereDoesThisPieceFit() {
    const statusOfThisTile = getTileStatus(row, column);
    let direction = 'none';
    
    if (statusOfThisTile === 'adjacent' && (activeDominoRotation === 0 || activeDominoRotation === 180)) {
      horizontalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && (statusOfTileInThisDirection === 'adjacent' || statusOfTileInThisDirection === 'eligible')) {
          direction = pref.direction;
        }
      });
    } else if (statusOfThisTile === 'eligible' && (activeDominoRotation === 0 || activeDominoRotation === 180)) {
      horizontalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && statusOfTileInThisDirection === 'adjacent') {
          direction = pref.direction;
        }
      })
    } else if (statusOfThisTile === 'adjacent' && (activeDominoRotation === 90 || activeDominoRotation === 270)) {
      verticalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && (statusOfTileInThisDirection === 'adjacent' || statusOfTileInThisDirection === 'eligible')) {
          direction = pref.direction;
        }
      });
    } else if (statusOfThisTile === 'eligible' && (activeDominoRotation === 90 || activeDominoRotation === 270)) {
      verticalDominoDirectionPreference.forEach((pref) => {
        const statusOfTileInThisDirection = getTileStatus(row + pref.rowOffset, column + pref.columnOffset);
        if (direction === 'none' && statusOfTileInThisDirection === 'adjacent') {
          direction = pref.direction;
        }
      });
    } else {
      return 'none'
    }

    return direction;
  }
  console.log(`
    activeDominoRotation: ${activeDominoRotation},
    rotation1: ${rotation1},
    rotation2: ${rotation2}
  `);
  return (
    <>
      <BlankSquare
        status={status}
        column={column}
        row={row}
        data-column={column}
        data-row={row}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {
          activePointer && activeDominoRotation <= 90
            ? <ImgTile rotation1={rotation1} rotation2={rotation2} direction={whereDoesThisPieceFit()}>
                <img className="one" src={`tiles/${imageURL1}`} alt="cool" />
                <img className="two" src={`tiles/${imageURL2}`} alt="cool" />
             </ImgTile>
            : activePointer && activeDominoRotation >=180
            ? <ImgTile rotation1={rotation1+180} rotation2={rotation2+180} direction={whereDoesThisPieceFit()}>
                <img className="two" src={`tiles/${imageURL2}`} alt="cool" />
                <img className="one" src={`tiles/${imageURL1}`} alt="cool" />
              </ImgTile>
            : null
        }
      </BlankSquare>
    </>
  );
}
