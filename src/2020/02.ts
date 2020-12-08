import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

interface PasswordData {
  firstRule: number;
  secondRule: number;
  letter: string;
  password: string;
}

const parseInput = (input: string): PasswordData[] => {
  return splitLines(input).map((row) => {
    const [rule, rawLetter, password] = row.split(/ /);
    const [first, second] = rule.split(/-/);
    return {
      firstRule: parseInt(first, 10),
      secondRule: parseInt(second, 10),
      letter: rawLetter[0],
      password,
    };
  });
};

const findPasswordsCount = (input: PasswordData[]): number => {
  return input
    .map((row) => {
      let count = 0;
      for (const char of row.password) {
        if (char === row.letter) {
          count++;
        }
      }

      if (count >= row.firstRule && count <= row.secondRule) {
        return true;
      }
      return false;
    })
    .filter(Boolean).length;
};

const findOTCPasswordsCount = (input: PasswordData[]): number => {
  return input
    .map((row) => {
      const firstMatch = row.password[row.firstRule - 1] === row.letter;
      const secondMatch = row.password[row.secondRule - 1] === row.letter;
      if ((firstMatch && !secondMatch) || (!firstMatch && secondMatch)) {
        return true;
      }
      return false;
    })
    .filter(Boolean).length;
};

export class Puzzle202002 extends PuzzleDay {
  part1(): string {
    return findPasswordsCount(parseInput(this.input)).toString();
  }

  part2(): string {
    return findOTCPasswordsCount(parseInput(this.input)).toString();
  }
}
