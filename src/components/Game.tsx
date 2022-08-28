import { useState } from "react";
import InteractiveBoard from "./InteractiveBoard";
import styled from "styled-components";

const GameContainer = styled.div`
  margin: 20px auto;
  width: min(90%, 1000px);
  height: auto;
`


export default function Game() {

  const [activeDomino, setActiveDomino] = useState([['tx', 't', 't', 't'], ['r', 'r', 'rx', 'r']]);
  const [activeDominoRotation, setActiveDominoRotation] = useState(270);

  return (
    <GameContainer>
      <InteractiveBoard activeDomino={activeDomino} activeDominoRotation={activeDominoRotation} />
    </GameContainer>
  )
}