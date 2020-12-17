import { Puzzle202015, parseInput } from './15';

let day: Puzzle202015;

describe('202015', () => {
  beforeEach(() => {
    day = new Puzzle202015('202015');
  });

  test('parseInput', () => {
    const input = `0,3,6`;
    const result = parseInput(input);
    expect(result).toEqual([0, 3, 6]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`0,3,6`);
    const result = day.part1();
    expect(result).toBe('436');
  });

  test('Part 1 example 2', () => {
    day.loadData(`1,3,2`);
    const result = day.part1();
    expect(result).toBe('1');
  });

  test('Part 1 example 3', () => {
    day.loadData(`2,1,3`);
    const result = day.part1();
    expect(result).toBe('10');
  });

  test('Part 1 example 4', () => {
    day.loadData(`1,2,3`);
    const result = day.part1();
    expect(result).toBe('27');
  });

  test('Part 1 example 5', () => {
    day.loadData(`2,3,1`);
    const result = day.part1();
    expect(result).toBe('78');
  });

  test('Part 1 example 6', () => {
    day.loadData(`3,2,1`);
    const result = day.part1();
    expect(result).toBe('438');
  });

  test('Part 1 example 7', () => {
    day.loadData(`3,1,2`);
    const result = day.part1();
    expect(result).toBe('1836');
  });

  test('Part 1 invalid', () => {
    day.loadData(` `);
    const result = day.part1();
    expect(result).toBe('0');
  });

  test('Part 2 example 1', () => {
    day.loadData(`0,3,6`);
    const result = day.part2();
    expect(result).toBe('175594');
  });
});
