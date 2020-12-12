import { Puzzle202011, parseInput } from './11';

let day: Puzzle202011;

describe('202011', () => {
  beforeEach(() => {
    day = new Puzzle202011('202011');
  });

  test('parseInput', () => {
    const input = `L.LL.
    LLLLL`;
    const result = parseInput(input);
    expect(result).toEqual([
      [
        { occupied: false, seat: true },
        { occupied: false, seat: false },
        { occupied: false, seat: true },
        { occupied: false, seat: true },
        { occupied: false, seat: false },
      ],
      [
        { occupied: false, seat: true },
        { occupied: false, seat: true },
        { occupied: false, seat: true },
        { occupied: false, seat: true },
        { occupied: false, seat: true },
      ],
    ]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = day.part1();
    expect(result).toBe('37');
  });

  test('Part 2 example 1', () => {
    day.loadData(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = day.part2();
    expect(result).toBe('26');
  });
});
