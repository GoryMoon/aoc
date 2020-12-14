import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

interface TimeTable {
  valid: boolean;
  interval: number;
}

interface Closest {
  interval: number;
  closest: number;
}

export const parseInput = (input: string): { time: number; timetable: TimeTable[] } => {
  const lines = splitLines(input);
  return {
    time: parseInt(lines[0], 10),
    timetable: lines[1]
      .split(',')
      .map<TimeTable>((v) => ({ valid: v !== 'x', interval: v !== 'x' ? parseInt(v, 10) : -1 })),
  };
};

const findClosestBus = (timetable: TimeTable[], time: number): Closest => {
  const closest = timetable
    .filter((v) => v.valid)
    .reduce<Closest[]>((all, curr) => {
      let currentCheck = curr.interval;
      while (true) {
        if (currentCheck >= time) {
          break;
        }
        currentCheck += curr.interval;
      }
      return [...all, { interval: curr.interval, closest: currentCheck }];
    }, []);
  closest.sort((a, b) => a.closest - b.closest);
  return closest[0];
};

// Needed to find help for this solution.
// Had a version that worked for the tests but was to slow for the input data
const findFirstSubsequentDeparture = (timetable: TimeTable[]): number => {
  let time = timetable[0].interval;
  let step = time;

  for (let i = 1; i < timetable.length; i++) {
    const { interval, valid } = timetable[i];
    if (!valid) continue;
    while ((time + i) % interval !== 0) {
      time += step;
    }
    step *= interval;
  }
  return time;
};

export class Puzzle202013 extends PuzzleDay {
  part1(): string {
    const { time, timetable } = parseInput(this.input);
    const result = findClosestBus(timetable, time);
    return ((result.closest - time) * result.interval).toString();
  }

  part2(): string {
    const { timetable } = parseInput(this.input);
    return findFirstSubsequentDeparture(timetable).toString();
  }
}
