import { Puzzle202013, parseInput } from './13';

let day: Puzzle202013;

describe('202013', () => {
  beforeEach(() => {
    day = new Puzzle202013('202013');
  });

  test('parseInput', () => {
    const input = `939
    7,13,x,x,59`;
    const result = parseInput(input);
    expect(result).toEqual({
      time: 939,
      timetable: [
        { valid: true, interval: 7 },
        { valid: true, interval: 13 },
        { valid: false, interval: -1 },
        { valid: false, interval: -1 },
        { valid: true, interval: 59 },
      ]
    });
  });

  test('Part 1 example 1', () => {
    day.loadData(`939
    7,13,x,x,59,x,31,19`);
    const result = day.part1();
    expect(result).toBe('295');
  });

  test('Part 2 example 1', () => {
    day.loadData(`939
    7,13,x,x,59,x,31,19`);
    const result = day.part2();
    expect(result).toBe('1068781');
  });

  test('Part 2 example 2', () => {
    day.loadData(`0
    17,x,13,19`);
    const result = day.part2();
    expect(result).toBe('3417');
  });

  test('Part 2 example 3', () => {
    day.loadData(`0
    67,7,59,61`);
    const result = day.part2();
    expect(result).toBe('754018');
  });
  
  test('Part 2 example 4', () => {
    day.loadData(`0
    67,x,7,59,61`);
    const result = day.part2();
    expect(result).toBe('779210');
  });

  test('Part 2 example 5', () => {
    day.loadData(`0
    67,7,x,59,61`);
    const result = day.part2();
    expect(result).toBe('1261476');
  });

  test('Part 2 example 6', () => {
    day.loadData(`0
    1789,37,47,1889`);
    const result = day.part2();
    expect(result).toBe('1202161486');
  });
});
