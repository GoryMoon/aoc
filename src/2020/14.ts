import { splitLines, sum } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Program = {
  maskString: string;
  setMask: bigint;
  clearMask: bigint;
  instructions: {
    k: number;
    v: number;
  }[];
};

/* tslint:disable:no-bitwise */
export const parseInput = (input: string): Program[] => {
  const programs: Program[] = [];
  const lines = splitLines(input);
  let currentProgram: Program | null = null;
  for (const row of lines) {
    if (row.startsWith('mask')) {
      if (currentProgram !== null) programs.push(currentProgram);
      const [, maskString] = row.match(/^mask = ([X01]+)/) ?? [];
      const parts = maskString?.split('').reverse();
      const setMask = !parts
        ? BigInt(0)
        : parts.reduce((tot, curr, i) => tot | ((curr === '1' ? BigInt(1) : BigInt(0)) << BigInt(i)), BigInt(0));
      const clearMask = !parts
        ? BigInt(0)
        : parts.reduce((tot, curr, i) => tot | ((curr === '0' ? BigInt(1) : BigInt(0)) << BigInt(i)), BigInt(0));
      currentProgram = {
        maskString,
        setMask,
        clearMask,
        instructions: [],
      };
    } else if (row.startsWith('mem') && currentProgram !== null) {
      const [, k, v] = row.match(/mem\[(\d+)\] = (\d+)/) ?? [];
      if (k && v) {
        currentProgram.instructions.push({
          k: parseInt(k, 10),
          v: parseInt(v, 10),
        });
      }
    }
  }
  if (currentProgram !== null) programs.push(currentProgram);

  return programs;
};

const setMemory = (programs: Program[]): BigUint64Array => {
  const memory = new BigUint64Array(99999).fill(BigInt(0));
  programs.forEach((prog) => {
    prog.instructions.forEach((inst) => (memory[inst.k] = (BigInt(inst.v) & ~prog.clearMask) | prog.setMask));
  });
  return memory.filter((v) => v > 0);
};
/* tslint:enable:no-bitwise */

const getAddress = (pos: number, mask: string): number[] => {
  const base = pos.toString(2).padStart(36, '0').split('');
  mask.split('').forEach((v, i) => {
    if (v !== '0') {
      base[i] = v;
    }
  });
  let result = [['0']];
  for (const b of base) {
    if (b !== 'X') {
      result.forEach((v) => v.push(b));
    } else {
      result = result.flatMap((v) => {
        const o = v.slice();
        const z = v.slice();
        o.push('1');
        z.push('0');
        return [o, z];
      });
    }
  }
  return result.map((v) => parseInt(v.join(''), 2));
};

const setMemoryV2 = (programs: Program[]): Map<number, number> => {
  const memory = new Map<number, number>();
  programs.forEach((prog) => {
    prog.instructions.forEach((inst) =>
      getAddress(inst.k, prog.maskString).forEach((v) => {
        memory.set(v, inst.v);
      }),
    );
  });

  return memory;
};

export class Puzzle202014 extends PuzzleDay {
  part1(): string {
    const programs = parseInput(this.input);
    const mem = setMemory(programs);
    return mem.reduce((tot, curr) => tot + curr, BigInt(0)).toString();
  }

  part2(): string {
    const programs = parseInput(this.input);
    const mem = setMemoryV2(programs);
    return Array.from(mem.values())
      .reduce((tot, curr) => tot + curr, 0)
      .toString();
  }
}
