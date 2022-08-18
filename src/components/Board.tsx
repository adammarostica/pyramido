const gridNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
export default function Board(): JSX.Element {

  const boardArr: string[][] = [
    ['y', 'yx', 'y', 'yx', 'y', 'y', 'r', 'r'],
    ['y', 'y', 'y', 'y', 'y', 'y', 'r', 'rx'],
    ['o', 'o', 'o', 'o', 'y', 'yx', 'yx', 'y'],
    ['o', 'ox', 'ox', 'o', 'y', 'y', 'y', 'y'],
    ['g', 'gx', 'b', 'b', 'b', 'b', 't', 't'],
    ['gx', 'g', 'b', 'b', 'b', 'bx', 'tx', 't'],
    ['t', 't', 'b', 'bx', 'b', 'b', 't', 't'],
    ['tx', 't', 'b', 'b', 'bx', 'b', 't', 'tx']
  ];

  const tileArr: object[] = [];

  for (let y=0; y < boardArr[0].length; y += 2) {
    for (let x=0; x< boardArr.length; x += 2) {
      const tile = {
        squares: [boardArr[y][x], boardArr[y][x+1], boardArr[y+1][x+1], boardArr[y+1][x]],
        row: y,
        column: x,
        gridRow: gridNumbers[y],
        gridColumn: gridNumbers[x]
      };
      tileArr.push(tile);
    }
  }

  console.log(tileArr);

  return (
    <h1>Hello</h1>
  )
}