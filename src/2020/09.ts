import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  return splitLines(input).map((v) => parseInt(v, 10));
};

const firstInvalid = (input: number[], preambleLength: number): number => {
  let result = 0;
  for (let i = preambleLength; i < input.length; i++) {
    const prev = input.slice(i - preambleLength, i);
    let valid = false;
    for (let j = 0; j < prev.length; j++) {
      for (let k = j + 1; k < prev.length; k++) {
        if (prev[j] + prev[k] === input[i]) {
          valid = true;
        }
      }
    }
    if (!valid) {
      result = input[i];
      break;
    }
  }
  return result;
};

const findContiguousNumbers = (input: number[], invalidNumber: number): number => {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    const numbers: number[] = [];
    let j = 0;
    while (sum < invalidNumber) {
      const num = input[i + j];
      numbers.push(num);
      sum += num;
      j++;
    }
    if (sum === invalidNumber && j >= 2) {
      numbers.sort((a, b) => a - b);
      result = numbers[0] + numbers[numbers.length - 1];
    }
  }
  return result;
};

export class Puzzle202009 extends PuzzleDay {
  preambleLength = 25;

  part1(): string {
    return firstInvalid(parseInput(this.input), this.preambleLength).toString();
  }

  part2(): string {
    const numbers = parseInput(this.input);
    const invalid = firstInvalid(numbers, this.preambleLength);
    return findContiguousNumbers(numbers, invalid).toString();
  }
}
