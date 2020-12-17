import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  return input.split(',').map(v => parseInt(v, 10)).filter(v => !isNaN(v));
};

const getNumberOnTurn = (starting: number[], turn: number): number => {
  let next: number = starting.pop() ?? 0;
  const cache = new Map<number, number>();
  starting.forEach((v, i) => cache.set(v, i));
  
  for (let i = starting.length; i < turn - 1; i++) {
    const diff = i - (cache.get(next) ?? i);
    cache.set(next, i);
    next = diff;
  }

  return next;
}

export class Puzzle202015 extends PuzzleDay {
  part1(): string {
    return getNumberOnTurn(parseInput(this.input), 2020).toString();
  }

  part2(): string {
    return getNumberOnTurn(parseInput(this.input), 30000000).toString();
  }
}
