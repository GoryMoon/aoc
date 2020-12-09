import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

interface Op {
  type: string;
  arg: number;
}

export const parseInput = (input: string): Op[] => {
  return splitLines(input).map((line) => {
    const [type, arg] = line.split(' ');
    return {
      type,
      arg: parseInt(arg, 10),
    };
  });
};

const runProgram = (program: Op[]): { acc: number; result: boolean } => {
  let acc = 0;
  let pc = 0;
  const prevPc = new Set<number>();
  let finished = false;

  const opHandler: { [key: string]: (val: number) => void } = {
    acc: (val) => {
      acc += val;
    },
    jmp: (val) => {
      pc += val - 1;
    },
    nop: () => {
      // NOP
    },
  };
  while (true) {
    if (pc >= program.length) {
      finished = true;
      break;
    }

    const op = program[pc];
    opHandler[op.type](op.arg);
    pc++;
    if (prevPc.has(pc)) {
      break;
    }
    prevPc.add(pc);
  }
  return { acc, result: finished };
};

const testInstructions = (program: Op[]): number => {
  const replacers = [
    ['nop', 'jmp'],
    ['jmp', 'nop'],
  ];

  for (const replace of replacers) {
    for (const op of program) {
      if (op.type === replace[0]) {
        op.type = replace[1];
        const { acc, result } = runProgram(program);
        if (result) {
          return acc;
        }
        op.type = replace[0];
      }
    }
  }
  return 0;
};

export class Puzzle202008 extends PuzzleDay {
  part1(): string {
    const program = parseInput(this.input);
    return runProgram(program).acc.toString();
  }

  part2(): string {
    const program = parseInput(this.input);
    return testInstructions(program).toString();
  }
}
