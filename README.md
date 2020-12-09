# aoc
[![codecov](https://codecov.io/gh/GoryMoon/aoc/branch/main/graph/badge.svg?token=OM2ZWMF7SL)](https://codecov.io/gh/GoryMoon/aoc)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/GoryMoon/aoc/CI?logo=github-actions&logoColor=ffffff)


Advent of Code Solutions in Typescript

I'm new to Typescript so I'm using it for this to learn.

Structure is based on [alan-seymour/aoc-ts](https://github.com/alan-seymour/aoc-ts)

## Usage

```bash
# run using ts-node
$ npm run solve-ts

# run using node
# build project before running
$ npm run build-ts
# run file
$ npm run solve
```

### Options

```sh
-d, --day   Run solution for specific day
-p, --part  Run specific part of solution (defaults to 1)
-t, --time  Measure the time it takes to solve
```

#### Examples

```bash
# Run 202001 part 1
$ npm run solve-ts -- -d 202001

# Run part 2 of 202001 with output time taken
$ npm run solve-ts -- -d 202001 -p 2 -t
```
