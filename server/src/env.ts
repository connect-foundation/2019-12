import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const NODE_ENV = process.env.NODE_ENV;
const envFileName = NODE_ENV ? `.env.${NODE_ENV}` : '.env';
const path = resolve(__dirname, `../${envFileName}`);

config({ path });

readFileSync(resolve(__dirname, '../.env.template'))
  .toString()
  .split('=\n')
  .map(s => s.trim())
  .filter(s => !!s)
  .forEach(key => {
    if (!process.env[key]) {
      const message = `환경변수 ${key} 를 ${envFileName} 파일에서 찾을 수 없습니다.`;
      throw new Error(message);
    }
  });
