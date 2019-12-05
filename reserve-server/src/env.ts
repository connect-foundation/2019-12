import { config } from 'dotenv';
import { resolve } from 'path';

const NODE_ENV = process.env.NODE_ENV;
const envFileName = NODE_ENV ? `.env.${NODE_ENV}` : '.env';
const path = resolve(__dirname, `../${envFileName}`);

config({ path });
