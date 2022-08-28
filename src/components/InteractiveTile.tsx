import styled from "styled-components";
import useOrientation from '../hooks/useOrientation'

interface TileProps {
  squares: string,
  row: number,
  column: number,
}

const ColoredTile = styled.div<{ image: string, rotate: number, column: number, row: number}>`
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  ${ props => `background-image: url("./tiles/${props.image}");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      transform: rotate(${props.rotate}deg);
      grid-column: ${props.column + 1} / span 1;
      grid-row: ${props.row + 1} / span 1;`
  }}
`;

export default function InteractiveTile({squares, row, column}: TileProps): JSX.Element {
  const [imageURL, rotation] = useOrientation(squares);
  return (
    <ColoredTile image={imageURL} rotate={rotation} column={column} row={row} />
  );
}