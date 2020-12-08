import { splitLines, sum } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

// Old parser, looked at some others afterwards and tested with regex below to learn it some more
const parseInputOld = (input: string): string[][] => {
  const lines = splitLines(input);
  const result: string[][] = [];
  let row: string[] = [];
  for (const line of lines) {
    if (line.trim() === '') {
      result.push(row);
      row = [];
    } else {
      row.push(line);
    }
  }
  result.push(row);
  return result;
};

const parseInput = (input: string): string[][] => {
  return input.split(/\r?\n\r?\n/).map((v) => v.split(/\r?\n/).map((line) => line.trim()));
};

const countUnique = (input: string[]): number => {
  const letters = new Set();
  const joined = input.join('');
  for (const letter of joined) {
    if (letter !== '\n') {
      letters.add(letter);
    }
  }
  return letters.size;
};

const countGroupUnique = (input: string[]): number => {
  const letters = new Map<string, number>();
  for (const row of input) {
    for (const letter of row) {
      letters.set(letter, (letters.get(letter) ?? 0) + 1);
    }
  }
  return [...letters.values()].filter((v) => v === input.length).length;
};

export class Puzzle202006 extends PuzzleDay {
  part1(): string {
    return parseInput(this.input).map(countUnique).reduce(sum).toString();
  }

  part2(): string {
    return parseInput(this.input).map(countGroupUnique).reduce(sum).toString();
  }
}
