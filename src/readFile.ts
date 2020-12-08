import * as fs from 'fs';

const asyncReadFile = (filename: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });

export const getData = async (filename: string) => {
  try {
    const data = await asyncReadFile(filename);
    return data.toString();
  } catch (e) {
    console.log(`Error reading file: ${e.message}`);
    return '';
  }
};
