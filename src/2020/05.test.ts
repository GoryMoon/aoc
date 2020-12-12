import { Puzzle202005, parseInput, findEmpty } from './05';

let day: Puzzle202005;

describe('202004', () => {
  beforeEach(() => {
    day = new Puzzle202005('202005');
  });

  test('parseInput example 1', () => {
    const input = `BFFFBBFRRR`;
    const result = parseInput(input);
    expect(result).toMatchObject({
      row: 70,
      col: 7,
    });
  });

  test('parseInput example 2', () => {
    const input = `FFFBBBFRRR`;
    const result = parseInput(input);
    expect(result).toMatchObject({
      row: 14,
      col: 7,
    });
  });

  test('parseInput example 3', () => {
    const input = `BBFFBBFRLL`;
    const result = parseInput(input);
    expect(result).toMatchObject({
      row: 102,
      col: 4,
    });
  });

  test('Part 1 example 1', () => {
    day.loadData(`BFFFBBFRRR
    FFFBBBFRRR
    BBFFBBFRLL`);
    const result = day.part1();
    expect(result).toBe('820');
  });

  test('Find empty', () => {
    expect(findEmpty([1, 2, 3, 5, 6])).toBe(4);
  });

  test('Find empty from none', () => {
    expect(findEmpty([])).toBe(1);
  });

  test('Part 2 find empty', () => {
    day.loadData(`FFFBBBBRLL
    FFFBBBBLLR
    FFFBBBBLRL
    FFFBBBBLLL
    FFFBBBBRLR`);
    // 124
    // 121
    // 122
    // 120
    // 125
    const result = day.part2();
    expect(result).toBe('123');
  });
});
