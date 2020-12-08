import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

interface Seat {
  row: number;
  col: number;
}

const bspSplit = (input: string[], bottomVal: string, topVal: number) => {
  const split = (bottom: number, top: number): number => {
    if (input.length > 0) {
      const val = input.shift();
      if (val === bottomVal) {
        bottom = bottom + Math.round((top - bottom) / 2);
      } else {
        top = top - Math.round((top - bottom) / 2);
      }
      return split(bottom, top);
    }
    return bottom;
  };
  return split(0, topVal);
};

const getSeat = (input: string): Seat => {
  return {
    row: bspSplit(input.slice(0, -3).split(''), 'B', 127),
    col: bspSplit(input.slice(-3).split(''), 'R', 8),
  };
};

const findEmpty = (seats: number[]): number => {
  let prev = seats.shift();
  let next = seats.shift();
  while ((prev ?? 0) + 1 === next) {
    prev = next;
    next = seats.shift();
  }
  return (prev ?? 0) + 1;
};

export class Puzzle202005 extends PuzzleDay {
  part1(): string {
    const seats = splitLines(this.input).map(getSeat);
    const seatIds = seats.map((s) => s.row * 8 + s.col);
    return Math.max(...seatIds).toString();
  }

  part2(): string {
    const seats = splitLines(this.input).map(getSeat);
    const seatIds = seats.map((s) => s.row * 8 + s.col);
    seatIds.sort((a, b) => a - b);
    return findEmpty(seatIds).toString();
  }
}
