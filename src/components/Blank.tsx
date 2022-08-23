import PlacementButton from './PlacementButton';
import styled from "styled-components";

type BlankProps = {
  activeDomino: string[][],
  activeDominoRotation: number,
  row: number,
  column: number,
  validPlacements: string[],
  setBoard: Function
}


const BlankGrid = styled.div<{gridColumn: number, gridRow: number}>`
  position: relative;
  outline: 1px solid #00000022;
  grid-column: ${props => props.gridColumn} / span 1;
  grid-row: ${props => props.gridRow} / span 1;
`;


export default function Blank({activeDomino, activeDominoRotation, row, column, validPlacements, setBoard}: BlankProps): JSX.Element {

  const dominoIsHorizontal = activeDominoRotation === 0 || activeDominoRotation === 180;
  const hasRightPlacement = validPlacements.includes('right');
  const hasBottomPlacement = validPlacements.includes('bottom');
  const shouldRenderButton = (dominoIsHorizontal && hasRightPlacement) || (!dominoIsHorizontal && hasBottomPlacement);

  console.log(row, column, hasBottomPlacement && hasRightPlacement);
  
  return (
    <BlankGrid gridColumn={column + 1} gridRow={row + 1}>
      {
          shouldRenderButton
            ? <PlacementButton activeDomino={activeDomino} activeDominoRotation={activeDominoRotation} setBoard={setBoard}/>
            : null
      }
    </BlankGrid>
  )
}