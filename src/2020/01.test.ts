import { parseInput, Puzzle202001 } from './01';

let day: Puzzle202001;

describe('202001', () => {
  beforeEach(() => {
    day = new Puzzle202001('202001');
  });

  test('parseInput', () => {
    const input = `1721
    979
    366
    299
    675
    1456`;
    const result = parseInput(input);
    expect(result).toEqual([1721, 979, 366, 299, 675, 1456]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`1721
    979
    366
    299
    675
    1456`);
    const result = day.part1();
    expect(result).toBe('514579');
  });

  test('Part 1 no valid values', () => {
    day.loadData('1');
    const result = day.part1();
    expect(result).toBe('NaN');
  });

  test('Part 2 example 1', () => {
    day.loadData(`1721
    979
    366
    299
    675
    1456`);
    const result = day.part2();
    expect(result).toBe('241861950');
  });

  test('Part 2 no valid values', () => {
    day.loadData('1');
    const result = day.part2();
    expect(result).toBe('NaN');
  });
});
