import { parseInput, Puzzle202002 } from './02';

let day: Puzzle202002;

describe('202002', () => {
  beforeEach(() => {
    day = new Puzzle202002('202002');
  });

  test('parseInput', () => {
    const input = `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`;
    const result = parseInput(input);
    expect(result).toEqual([
      {
        firstRule: 1,
        secondRule: 3,
        letter: 'a',
        password: 'abcde',
      },
      {
        firstRule: 1,
        secondRule: 3,
        letter: 'b',
        password: 'cdefg',
      },
      {
        firstRule: 2,
        secondRule: 9,
        letter: 'c',
        password: 'ccccccccc',
      },
    ]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`);
    const result = day.part1();
    expect(result).toBe('2');
  });

  test('Part 2 example 1', () => {
    day.loadData(`1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`);
    const result = day.part2();
    expect(result).toBe('1');
  });
});
