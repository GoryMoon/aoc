import { Puzzle202003 } from './03';

let day: Puzzle202003;

describe('202003', () => {
  beforeEach(() => {
    day = new Puzzle202003('202003');
  });

  test('Part 1 example 1', () => {
    day.loadData(`..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`);
    const result = day.part1();
    expect(result).toBe('7');
  });

  test('Part 2 example 1', () => {
    day.loadData(`..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`);
    const result = day.part2();
    expect(result).toBe('336');
  });
});
