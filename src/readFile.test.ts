import { getData } from './readFile';

describe('ReadFile', () => {
  test('Load file', async () => {
    const result = await getData('./inputs/test.txt');
    expect(result).toBe(`1
2
3
4
5
6`);
  });

  test('Invalid file', async () => {
    console.log = jest.fn();
    const result = await getData('./inputs/invalid.txt');
    expect(result).toBe('');
    expect(console.log).toHaveBeenCalledWith(
      "Error reading file: ENOENT: no such file or directory, open './inputs/invalid.txt'",
    );
  });
});
