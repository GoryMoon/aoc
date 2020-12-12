import { Puzzle202012, parseInput } from './12';

let day: Puzzle202012;

describe('202012', () => {
  beforeEach(() => {
    day = new Puzzle202012('202012');
  });

  test('parseInput', () => {
    const input = `F10
    N3
    F7
    R90
    F11`;
    const result = parseInput(input);
    expect(result).toEqual([
      { action: 'F', amount: 10 },
      { action: 'N', amount: 3 },
      { action: 'F', amount: 7 },
      { action: 'R', amount: 90 },
      { action: 'F', amount: 11 },
    ]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`F10
    N3
    F7
    R90
    F11`);
    const result = day.part1();
    expect(result).toBe('25');
  });

  test('Part 1 all actions', () => {
    day.loadData(`N1
    E2
    S3
    W4
    F5
    R90
    F1
    R90
    F2
    R90
    F3
    L270
    F4`);
    const result = day.part1();
    expect(result).toBe('5');
  });

  test('Part 2 example 1', () => {
    day.loadData(`F10
    N3
    F7
    R90
    F11`);
    const result = day.part2();
    expect(result).toBe('286');
  });

  test('Part 2 all actions', () => {
    day.loadData(`N1
    E2
    S3
    W4
    F5
    R90
    F1
    L270
    F2`);
    const result = day.part2();
    expect(result).toBe('34');
  });
});
