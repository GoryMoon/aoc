import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

const countTrees = (rows: string[], right: number, down: number): number => {
  const width = rows[0].length;
  let count: number = 0;
  let x: number = right;

  for (let y = down; y < rows.length; y += down) {
    if (rows[y % width][x] === '#') {
      count++;
    }
    x += right;
  }
  return count;
};

export class Puzzle202003 extends PuzzleDay {
  part1(): string {
    return countTrees(splitLines(this.input), 3, 1).toString();
  }

  part2(): string {
    const rows = splitLines(this.input);
    return (
      countTrees(rows, 1, 1) *
      countTrees(rows, 3, 1) *
      countTrees(rows, 5, 1) *
      countTrees(rows, 7, 1) *
      countTrees(rows, 1, 2)
    ).toString();
  }
}
