export const splitLines = (text: string): string[] => {
  return text.split(/\r?\n/).map((line) => line.trim());
};

export const sum = (a: number, b: number): number => {
  return a + b;
};
