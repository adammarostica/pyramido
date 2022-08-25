import styled from "styled-components";

type BlankProps = {
  activeDomino: string[][],
  activeDominoRotation: number,
  row: number,
  column: number,
  status: string,
  placeDomino: Function
}


const BlankSquare = styled.div<{status: string, column: number, row: number}>`
  position: relative;
  outline: 1px solid #00000022;
  aspect-ratio: 1 / 1;
  grid-column: ${props => props.column + 1} / span 1;
  grid-row: ${props => props.row + 1} / span 1;
  background-color: ${props => {
    if (props.status === 'impossible') {
      return 'slategrey';
    } else if (props.status === 'possible') {
      return 'lightgrey';
    } else {
      return 'white';  
    }
  }}
`;


export default function Blank({activeDomino, activeDominoRotation, row, column, status, placeDomino}: BlankProps): JSX.Element {

  
function handleClick() {
  placeDomino([['o', 'o', 'o', 'o'], ['o', 'o', 'o', 'o']], row, column, "right");
}
  
  return (
    <BlankSquare status={status} column={column} row={row} data-column={column} data-row={row} onClick={handleClick}/>
  )
}