import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

interface Action {
  action: string;
  amount: number;
}

export const parseInput = (input: string): Action[] => {
  return splitLines(input).map<Action>((v) => {
    return {
      action: v[0],
      amount: parseInt(v.substr(1), 10),
    };
  });
};

const headingFromRotation = (rotation: number): string => {
  switch (rotation % 360) {
    case 90:
      return 'E';
    case 180:
      return 'S';
    case 270:
      return 'W';
    case 0:
    default:
      return 'N';
  }
};

const followStep1Instructions = (instructions: Action[], heading: number): { east: number; north: number } => {
  let north = 0;
  let east = 0;
  let rotation = heading;

  const move = (amount: number, dir: string) => {
    if (dir === 'N' || dir === 'S') {
      north += dir === 'N' ? amount : -amount;
    } else {
      east += dir === 'E' ? amount : -amount;
    }
  };

  const rotate = (amount: number, dir: string) => {
    rotation = (rotation + (dir === 'R' ? amount : 360 - amount)) % 360;
  };

  for (const v of instructions) {
    switch (v.action) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        move(v.amount, v.action);
        break;
      case 'F':
        move(v.amount, headingFromRotation(rotation));
        break;
      case 'R':
      case 'L':
        rotate(v.amount, v.action);
        break;
    }
  }
  return { east, north };
};

const followStep2Instructions = (instructions: Action[]): { east: number; north: number } => {
  let waypointNorth = 1;
  let waypointEast = 10;
  let north = 0;
  let east = 0;

  const move = (amount: number, dir: string) => {
    if (dir === 'N' || dir === 'S') {
      waypointNorth += dir === 'N' ? amount : -amount;
    } else {
      waypointEast += dir === 'E' ? amount : -amount;
    }
  };

  const forward = (amount: number) => {
    north += waypointNorth * amount;
    east += waypointEast * amount;
  };

  const rotate = (amount: number, dir: string) => {
    const rotTimes = ((dir === 'R' ? amount : 360 - amount) % 360) / 90;
    for (let i = 0; i < rotTimes; i++) {
      const tmpNorth = -waypointEast;
      waypointEast = waypointNorth;
      waypointNorth = tmpNorth;
    }
  };

  for (const v of instructions) {
    switch (v.action) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        move(v.amount, v.action);
        break;
      case 'F':
        forward(v.amount);
        break;
      case 'R':
      case 'L':
        rotate(v.amount, v.action);
        break;
    }
  }
  return { east, north };
};

export class Puzzle202012 extends PuzzleDay {
  part1(): string {
    const { east, north } = followStep1Instructions(parseInput(this.input), 90);
    return (Math.abs(north) + Math.abs(east)).toString();
  }

  part2(): string {
    const { east, north } = followStep2Instructions(parseInput(this.input));
    return (Math.abs(north) + Math.abs(east)).toString();
  }
}
