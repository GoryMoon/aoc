import { Puzzle202008, parseInput } from './08';

let day: Puzzle202008;

describe('202008', () => {
  beforeEach(() => {
    day = new Puzzle202008('202008');
  });

  test('parseInput', () => {
    const ops = `nop +0
    acc +1
    jpm -4;`;
    const result = parseInput(ops);
    expect(result).toEqual([
      {
        type: 'nop',
        arg: 0,
      },
      {
        type: 'acc',
        arg: 1,
      },
      {
        type: 'jpm',
        arg: -4,
      },
    ]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`nop +0
    acc +1
    jmp +4
    acc +3
    jmp -3
    acc -99
    acc +1
    jmp -4
    acc +6`);
    const result = day.part1();
    expect(result).toBe('5');
  });

  test('Part 2 example 1', () => {
    day.loadData(`nop +0
    acc +1
    jmp +4
    acc +3
    jmp -3
    acc -99
    acc +1
    jmp -4
    acc +6`);
    const result = day.part2();
    expect(result).toBe('8');
  });

  test('Part 2 not valid', () => {
    day.loadData(`nop +0
    jmp -0
    jmp -2`);
    const result = day.part2();
    expect(result).toBe('0');
  });
});
