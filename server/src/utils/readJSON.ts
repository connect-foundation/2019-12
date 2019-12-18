import { readFile } from 'fs';

export function readJSONData<T>(path: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data.toString()));
    });
  });
}
