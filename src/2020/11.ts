import { splitLines, sum } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

interface Seating {
  occupied: boolean;
  seat: boolean;
}

interface Change {
  x: number;
  y: number;
  occupied: boolean;
}

export const parseInput = (input: string): Seating[][] => {
  return splitLines(input).reduce<Seating[][]>((allPosition, line) => {
    const row = line.split('').map((v) => {
      const seat = v === 'L';
      return {
        seat,
        occupied: false,
      };
    });
    return [...allPosition, row];
  }, []);
};

const getSeatsAround = (map: Seating[][], x: number, y: number): Seating[] => {
  return [
    { x: x - 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ]
    .filter((v) => v.x >= 0 && v.x < map[0].length && v.y >= 0 && v.y < map.length)
    .map((v) => map[v.y][v.x])
    .filter((v) => v.seat);
};

const simulateSeating = (
  map: Seating[][],
  getSeats: (m: Seating[][], x: number, y: number) => Seating[],
  limit: number,
): Seating[][] => {
  const mapWidth = map[0].length;
  let tmpMap = map;
  while (true) {
    const changes: Change[] = [];
    for (let y = 0; y < tmpMap.length; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const seat = tmpMap[y][x];
        const seats = getSeats(tmpMap, x, y);
        if (seat.occupied && seats.filter((v) => v.occupied).length >= limit) {
          changes.push({ occupied: false, x, y });
        } else if (!seat.occupied && seats.filter((v) => v.occupied).length === 0) {
          changes.push({ occupied: true, x, y });
        }
      }
    }

    if (changes.length <= 0) {
      break;
    }
    tmpMap = tmpMap.map((row, y) =>
      row.map((pos, x) => {
        const change = changes.find((v) => v.x === x && v.y === y);
        return change ? { ...pos, occupied: change.occupied } : pos;
      }),
    );
  }
  return tmpMap;
};

const getVisibleSeats = (map: Seating[][], x: number, y: number): Seating[] => {
  const def: Seating = { seat: false, occupied: false };
  const height = map.length;
  const width = map[0].length;

  // Directional
  const posY = (py: number, px: number): Seating =>
    py < height ? (map[py][px].seat ? map[py][x] : posY(py + 1, px)) : def;
  const negY = (py: number, px: number): Seating =>
    py >= 0 ? (map[py][px].seat ? map[py][x] : negY(py - 1, px)) : def;
  const posX = (py: number, px: number): Seating =>
    px < width ? (map[py][px].seat ? map[y][px] : posX(py, px + 1)) : def;
  const negX = (py: number, px: number): Seating =>
    px >= 0 ? (map[py][px].seat ? map[y][px] : negX(py, px - 1)) : def;

  // Diagonal
  const topL = (py: number, px: number): Seating =>
    py < height && px >= 0 ? (map[py][px].seat ? map[py][px] : topL(py + 1, px - 1)) : def;
  const lowL = (py: number, px: number): Seating =>
    py >= 0 && px >= 0 ? (map[py][px].seat ? map[py][px] : lowL(py - 1, px - 1)) : def;
  const topR = (py: number, px: number): Seating =>
    py < height && px < width ? (map[py][px].seat ? map[py][px] : topR(py + 1, px + 1)) : def;
  const lowR = (py: number, px: number): Seating =>
    py >= 0 && px < width ? (map[py][px].seat ? map[py][px] : lowR(py - 1, px + 1)) : def;
  return [
    posY(y + 1, x),
    negY(y - 1, x),
    posX(y, x + 1),
    negX(y, x - 1),
    topL(y + 1, x - 1),
    lowL(y - 1, x - 1),
    topR(y + 1, x + 1),
    lowR(y - 1, x + 1),
  ];
};

export class Puzzle202011 extends PuzzleDay {
  part1(): string {
    let map = parseInput(this.input);
    map = simulateSeating(map, getSeatsAround, 4);
    return map
      .reduce<Seating[]>((allSeats, row) => [...allSeats, ...row], [])
      .filter((v) => v.seat && v.occupied)
      .length.toString();
  }

  part2(): string {
    let map = parseInput(this.input);
    map = simulateSeating(map, getVisibleSeats, 5);

    return map
      .reduce<Seating[]>((allSeats, row) => [...allSeats, ...row], [])
      .filter((v) => v.seat && v.occupied)
      .length.toString();
  }
}
