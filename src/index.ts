import * as yargs from 'yargs';
import { PuzzleDay } from './puzzleDay';
import prettyTime from 'pretty-time';

import { Puzzle202001 } from './2020/01';
import { Puzzle202002 } from './2020/02';
import { Puzzle202003 } from './2020/03';
import { Puzzle202004 } from './2020/04';
import { Puzzle202005 } from './2020/05';
import { Puzzle202006 } from './2020/06';
import { Puzzle202007 } from './2020/07';
import { Puzzle202008 } from './2020/08';
import { Puzzle202009 } from './2020/09';
import { Puzzle202010 } from './2020/10';
import { Puzzle202011 } from './2020/11';
import { Puzzle202012 } from './2020/12';
import { Puzzle202013 } from './2020/13';
import { Puzzle202014 } from './2020/14';
import { Puzzle202015 } from './2020/15';

const argv = yargs.options({
  day: { type: 'string', alias: 'd', default: '' },
  part: { type: 'number', alias: 'p', default: 1 },
  time: { type: 'boolean', alias: 't', default: false },
}).argv;

async function run() {
  const inputFile = `./inputs/${argv.day}.txt`;

  let day: PuzzleDay;
  try {
    day = dayToClass(argv.day, inputFile);
  } catch (e) {
    console.log('Invalid day or input file');
    return;
  }

  await day.loadData();
  const time = process.hrtime();

  let result: string = '';

  if (argv.part === 1) {
    result = day.part1();
  }
  if (argv.part === 2) {
    result = day.part2();
  }

  if (argv.time) {
    const diff = process.hrtime(time);
    result = `${result} in ${prettyTime(diff)}`;
  }

  console.log(result);
}

const dayToClass = (day: string, inputFile: string): PuzzleDay => {
  switch (day) {
    case '202001':
      return new Puzzle202001(inputFile);
    case '202002':
      return new Puzzle202002(inputFile);
    case '202003':
      return new Puzzle202003(inputFile);
    case '202004':
      return new Puzzle202004(inputFile);
    case '202005':
      return new Puzzle202005(inputFile);
    case '202006':
      return new Puzzle202006(inputFile);
    case '202007':
      return new Puzzle202007(inputFile);
    case '202008':
      return new Puzzle202008(inputFile);
    case '202009':
      return new Puzzle202009(inputFile);
    case '202010':
      return new Puzzle202010(inputFile);
    case '202011':
      return new Puzzle202011(inputFile);
    case '202012':
      return new Puzzle202012(inputFile);
    case '202013':
      return new Puzzle202013(inputFile);
    case '202014':
      return new Puzzle202014(inputFile);
    case '202015':
      return new Puzzle202015(inputFile);
    default:
      throw new Error('No such Day');
  }
};

run();
