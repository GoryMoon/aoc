import { Puzzle202014, parseInput } from './14';

let day: Puzzle202014;

describe('202014', () => {
  beforeEach(() => {
    day = new Puzzle202014('202014');
  });

  test('parseInput', () => {
    const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0`;
    const result = parseInput(input);
    expect(result).toEqual([
      {
        maskString: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        setMask: BigInt(0b1000000),
        clearMask: BigInt(0b10),
        instructions: [
          { k: 8, v: 11 },
          { k: 7, v: 101 },
          { k: 8, v: 0 },
        ],
      },
    ]);
  });

  test('parseInput invalid', () => {
    const input = `mem[0] = 0
    invalid
    mask = AAAA0AA1
    mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[0] = A`;
    const result = parseInput(input);
    expect(result).toEqual([
      {
        maskString: undefined,
        setMask: BigInt(0),
        clearMask: BigInt(0),
        instructions: [],
      },
      {
        maskString: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
        setMask: BigInt(0b1000000),
        clearMask: BigInt(0b10),
        instructions: [],
      },
    ]);
  });

  test('parseInput invalid 2', () => {
    const input = `mem[0] = 0`;
    const result = parseInput(input);
    expect(result).toEqual([]);
  });

  test('parseInput part of real', () => {
    const input = `mask = 1X11X010X000X0X101X00100011X10100111
    mem[40278] = 36774405`;
    const result = parseInput(input);
    expect(result).toEqual([
      {
        maskString: '1X11X010X000X0X101X00100011X10100111',
        setMask: BigInt(0b101100100000000101000100011010100111),
        clearMask: BigInt(0b000001010111010010011011100001011000),
        instructions: [{ k: 40278, v: 36774405 }],
      },
    ]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0`);
    const result = day.part1();
    expect(result).toBe('165');
  });

  test('Part 1 clear', () => {
    day.loadData(`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11`);
    const result = day.part1();
    expect(result).toBe('73');
  });

  test('Part 1 test multiple', () => {
    day.loadData(`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0
    mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0XX1XX
    mem[9] = 11
    mem[1] = 101`);
    const result = day.part1();
    expect(result).toBe('249');
  });

  test('Part 1 test part of real', () => {
    day.loadData(`mask = 1X11X010X000X0X101X00100011X10100111
    mem[40278] = 36774405`);
    const result = day.part1();
    expect(result).toBe((0b101100100000001101000100011010100111).toString());
  });

  test('Part 2 example 1', () => {
    day.loadData(`mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1`);
    const result = day.part2();
    expect(result).toBe('208');
  });
});
