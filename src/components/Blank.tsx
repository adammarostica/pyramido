import { useState } from "react";
import styled from "styled-components";
import useOrientation from "../hooks/useOrientation";
import { TileProps } from "../data/testBoard"


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

const ImgTile = styled.div<{rotate: string}>`
  img {
    position: absolute;
    width: 100%;
    height: auto;
    display: inline-block;
    transform: rotate(${props => props.rotate});
  }
  img:nth-of-type(2) {
    z-index: 1;
    transform: translateX(100%);
  }
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
  console.log(activeDominoRotation, rotation1);
  function handlePointerEnter() {
    if (board[row][column].status === 'adjacent' || board[row][column].status === 'eligible') {
      setActivePointer(true);

    }
  }

  function handlePointerLeave() {
    setActivePointer(false);
  }

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
          activePointer
            ? <ImgTile rotate={rotation1}>
              <img className="one" src={`tiles/${imageURL1}`} alt="cool" />
              <img className="two" src={`tiles/${imageURL2}`} alt="cool" />
            </ImgTile>
            : null
        }
      </BlankSquare>
    </>
  );
}
