import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Passport = {
  [key: string]: string;
};

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const parseRow = (row: string): Passport => {
  return row
    .trimStart()
    .split(/ /)
    .reduce<Passport>((obj, v) => {
      const [key, value] = v.split(/:/);
      obj[key] = value;
      return obj;
    }, {});
};

const parseInput = (input: string): Passport[] => {
  const lines = splitLines(input);
  const result: Passport[] = [];
  let row: string = '';
  for (const line of lines) {
    if (line.trim() === '') {
      result.push(parseRow(row));
      row = '';
    } else {
      row += ` ${line}`;
    }
  }
  result.push(parseRow(row));
  return result;
};

const keyValidation: { [key: string]: (val: string) => boolean } = {
  byr: (val) => {
    const intVal = parseInt(val, 10);
    return intVal >= 1920 && intVal <= 2002;
  },
  iyr: (val) => {
    const intVal = parseInt(val, 10);
    return intVal >= 2010 && intVal <= 2020;
  },
  eyr: (val) => {
    const intVal = parseInt(val, 10);
    return intVal >= 2020 && intVal <= 2030;
  },
  hgt: (val) => {
    const end = val.slice(-2);
    const intVal = parseInt(val.slice(0, -2), 10);
    if (end === 'cm') {
      return intVal >= 150 && intVal <= 193;
    } else if (end === 'in') {
      return intVal >= 50 && intVal <= 76;
    }
    return false;
  },
  hcl: (val) => {
    return /^#[0-9a-f]{6}$/.test(val);
  },
  ecl: (val) => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val);
  },
  pid: (val) => {
    return /^\d{9}$/.test(val);
  },
};

const validatePassportKeys = (passport: Passport) => {
  return requiredKeys.every((key) => passport[key] !== undefined);
};

const validatePassportContent = (passport: Passport) => {
  return requiredKeys.every((key) => passport[key] !== undefined && keyValidation[key](passport[key]));
};

export class Puzzle202004 extends PuzzleDay {
  part1(): string {
    const rows = parseInput(this.input);
    return rows.filter(validatePassportKeys).length.toString();
  }

  part2(): string {
    const rows = parseInput(this.input);
    return rows.filter(validatePassportContent).length.toString();
  }
}
