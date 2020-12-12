import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

// Got a bit stuck, heavily inspired of code from where this structure is based on

type BagRules = {
  [key: string]: {
    color: string;
    quantity: number;
  }[];
};

export const parseInput = (input: string): BagRules => {
  const lines = splitLines(input);
  return lines.reduce((allRules, line) => {
    const [, outerBag, rules] = line.match(/^(.*) bags contain (.*)\./) ?? [];
    if (rules) {
      const subRules = rules
        .split(',')
        .map((subRule) => {
          const [, count, color] = subRule.match(/(\d+) (.*) bags?/) ?? [];
          return {
            color,
            quantity: +count,
          };
        })
        .filter((r) => r.color && r.quantity);
      return {
        ...allRules,
        [outerBag]: subRules,
      };
    }
    return allRules;
  }, {});
};

const invertRules = (rules: BagRules): BagRules => {
  const output: BagRules = {};
  Object.keys(rules).forEach((key) => {
    rules[key].forEach((child) => {
      if (!output[child.color]) {
        output[child.color] = [];
      }
      output[child.color].push({ color: key, quantity: child.quantity });
    });
  });

  return output;
};

const findChildren = (rules: BagRules, root: string): string[] => {
  const children = new Set<string>([root]);
  const queue: string[] = [root];
  let color = queue.shift();

  while (color) {
    if (rules[color]) {
      rules[color].forEach((v) => {
        if (!children.has(v.color)) {
          queue.push(v.color);
          children.add(v.color);
        }
      });
    }
    color = queue.shift();
  }
  return Array.from(children);
};

const countInnerBags = (rules: BagRules, root: string): number => {
  const cache = new Map<string, number>();
  const innerCount = (color: string): number => {
    const cacheVal = cache.get(color);
    if (cacheVal) {
      return cacheVal;
    }

    const sum = rules[color].reduce<number>((total, curr) => total + innerCount(curr.color) * curr.quantity, 1);
    cache.set(color, sum);
    return sum;
  };
  return innerCount(root);
};

export class Puzzle202007 extends PuzzleDay {
  part1(): string {
    const rules = parseInput(this.input);
    const invertedRules = invertRules(rules);
    return (findChildren(invertedRules, 'shiny gold').length - 1).toString();
  }

  part2(): string {
    const rules = parseInput(this.input);
    return (countInnerBags(rules, 'shiny gold') - 1).toString();
  }
}
