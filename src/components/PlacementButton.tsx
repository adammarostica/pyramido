import styled from "styled-components";
import useOrientation from "../hooks/useOrientation";

type PlacementButtonProps = {
  activeDomino: string[][];
  activeDominoRotation: number;
  setBoard: Function;
};

const Button = styled.div<{ activeDominoRotation: number }>`
  z-index: 1;
  position: absolute;
  width: 33%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease-in;
  cursor: pointer;
  ${props => {
    if (props.activeDominoRotation === 0 || props.activeDominoRotation === 180) {
      return `display: flex;
              width: 66%;
              left: 100%;
              top: 50%;
              &:hover {
                width: 200%;
                z-index: 999;
              }`
    } else {
      return `left: 50%;
              top: 100%;
              &:hover {
                width: 100%;
                z-index: 999;
              }`
    }
  }}
  
`;

const TileImage = styled.img<{rotation: number}>`
  display: flex;
  width: 100%;
  height: auto;
  transform: rotate(${props => props.rotation})
`;

export default function PlacementButton({
  activeDomino,
  activeDominoRotation,
  setBoard,
}: PlacementButtonProps) {
  const [imageURL1, rotation1] = useOrientation(activeDomino[0].join("_"));
  const [imageURL2, rotation2] = useOrientation(activeDomino[1].join("_"));

  return (
    <Button activeDominoRotation={activeDominoRotation}>
      {activeDominoRotation === 0 || activeDominoRotation === 90 ? (
        <>
          <TileImage rotation={rotation1} src={`./tiles/${imageURL1}`} alt="A tile" />
          <TileImage rotation={rotation2} src={`./tiles/${imageURL2}`} alt="A tile" />
        </>
      ) : (
        <>
          <TileImage rotation={rotation2} src={`./tiles/${imageURL2}`} alt="A tile" />
          <TileImage rotation={rotation1} src={`./tiles/${imageURL1}`} alt="A tile" />
        </>
      )}
    </Button>
  );
}
