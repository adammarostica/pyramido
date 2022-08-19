import styled from "styled-components";
import useOrientation from '../hooks/useOrientation'

interface TileProps {
  squares: string,
  row: number,
  column: number,
  gridRow: number,
  gridColumn: number
}

const ColoredTile = styled.div<{ image: string, rotate: string}>`
  width: 100%;
  height: auto;
  background-image: url("./tiles/${props => props.image}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  transform: rotate(${props => props.rotate});
`;

export default function Tile({squares, row, column, gridRow, gridColumn}: TileProps) {
 
  const [imageURL, rotation] = useOrientation(squares);

  return (
    <ColoredTile image={imageURL} rotate={rotation} />
  );
}