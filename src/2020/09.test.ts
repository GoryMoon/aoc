import { Puzzle202009, parseInput } from './09';

let day: Puzzle202009;

describe('202009', () => {
  beforeEach(() => {
    day = new Puzzle202009('202009');
  });

  test('parseInput', () => {
    const input = `35
    20
    15
    25
    47
    40
    62
    55
    65
    95`;
    const result = parseInput(input);
    expect(result).toEqual([35, 20, 15, 25, 47, 40, 62, 55, 65, 95]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576`);
    day.preambleLength = 5;
    const result = day.part1();
    expect(result).toBe('127');
  });

  test('Part 2 example 1', () => {
    day.loadData(`35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576`);
    day.preambleLength = 5;
    const result = day.part2();
    expect(result).toBe('62');
  });
});
