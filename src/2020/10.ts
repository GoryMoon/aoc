import { splitLines, sum } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  return splitLines(input).map(v => parseInt(v, 10));
};

const countJoltDifferences = (input: number[]): number[] => {
  const result = [0, 0, 1];
  let currentJolt = 0;
  for (const num of input) {
    const diff = num - currentJolt;
    const oldVal = result[diff - 1];
    result[diff - 1] = oldVal + 1;
    currentJolt = num;
  }
  return result;
}

const countJoltPermutations = (input: number[]): number => {
  const cache = new Map<number, number>();
  const innerCount = (start: number): number => {
    const cacheVal = cache.get(start);
    if (cacheVal) {
      return cacheVal;
    }

    const count = Math.max([start + 1, start + 2, start + 3]
      .filter(v => input.indexOf(v) !== -1)
      .map(v => innerCount(v))
      .reduce(sum, 0), 1)
    
    cache.set(start, count);
    return count;
  };
  return innerCount(0);
}

export class Puzzle202010 extends PuzzleDay {

  part1(): string {
    const input = parseInput(this.input);
    input.sort((a, b) => a - b);
    const count = countJoltDifferences(input);
    return (count[0] * count[2]).toString();
  }

  part2(): string {
    const input = parseInput(this.input);
    input.sort((a, b) => a - b);
    return countJoltPermutations(input).toString();
  }
}
