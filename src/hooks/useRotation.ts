import { zip } from 'lodash';
import { useState } from 'react';

type Matrix = (string | undefined)[][]

export default function useRotation( matrixNeedingRotation : Matrix ): [Matrix, () => void] {

  const [matrix, setMatrix] = useState<Matrix>(matrixNeedingRotation);

  function rotateMatrix(): void {
    const newMatrix = zip(...matrix);

    newMatrix.forEach(arr => {
      arr.reverse();
    })

    setMatrix(newMatrix);
  }

  let ourTuple: [Matrix, () => void];
  ourTuple = [matrix, rotateMatrix];
 
  return ourTuple;
}
