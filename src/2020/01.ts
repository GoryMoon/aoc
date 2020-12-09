import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const lines = splitLines(input);
  return lines.map((line) => parseInt(line, 10));
};

const findSum2val = (input: number[]): number[] => {
  input.sort((a, b) => a - b);
  for (let i = 0; i < input.length; i++) {
    const val1 = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const val2 = input[j];
      if (val1 + val2 === 2020) {
        return [val1, val2];
      }
    }
  }
  return [];
};

const findSum3val = (input: number[]): number[] => {
  input.sort((a, b) => a - b);
  for (let i = 0; i < input.length; i++) {
    const val1 = input[i];
    for (let j = i + 1; j < input.length; j++) {
      const val2 = input[j];
      for (let k = j + 1; k < input.length; k++) {
        const val3 = input[k];
        if (val1 + val2 + val3 === 2020) {
          return [val1, val2, val3];
        }
      }
    }
  }
  return [];
};

export class Puzzle202001 extends PuzzleDay {
  part1(): string {
    const values = parseInput(this.input);
    const matchingValues = findSum2val(values);
    return (matchingValues[0] * matchingValues[1]).toString();
  }

  part2(): string {
    const values = parseInput(this.input);
    const matchingValues = findSum3val(values);
    return (matchingValues[0] * matchingValues[1] * matchingValues[2]).toString();
  }
}
