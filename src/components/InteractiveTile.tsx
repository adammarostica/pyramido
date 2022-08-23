import styled from "styled-components";
import useOrientation from '../hooks/useOrientation'

interface TileProps {
  squares: string,
  row: number,
  column: number,
}

const ColoredTile = styled.div<{ image: string, rotate: string, gridColumn: number, gridRow: number}>`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  ${ props => `background-image: url("./tiles/${props.image}");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      transform: rotate(${props.rotate});
      grid-column: ${props.gridColumn} / span 1;
      grid-row: ${props.gridRow} / span 1;`
  }}
`;

export default function InteractiveTile({squares, row, column}: TileProps): JSX.Element {
  const [imageURL, rotation] = useOrientation(squares);
  return (
    <ColoredTile image={imageURL} rotate={rotation} gridColumn={column + 1} gridRow={row + 1} />
  );
}