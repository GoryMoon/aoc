import { PuzzleDay } from './puzzleDay';

export class PuzzleTest extends PuzzleDay {
  part1(): string {
    return '';
  }

  part2(): string {
    return this.input.split(/\r?\n/).join(' ');
  }
}

let day: PuzzleTest;

describe('PuzzleTest', () => {
  beforeEach(() => {
    day = new PuzzleTest('./inputs/test.txt');
  });

  test('loadData', async () => {
    await day.loadData();
    expect(day.input).toEqual(`1
2
3
4
5
6`);
  });

  test('Part 1 test', async () => {
    await day.loadData();
    const result = day.part1();
    expect(result).toBe('');
  });

  test('Part 2 test', async () => {
    await day.loadData();
    const result = day.part2();
    expect(result).toBe('1 2 3 4 5 6');
  });
});
