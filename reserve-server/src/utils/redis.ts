import * as redis from 'redis';

const { REDIS_PORT, REDIS_HOST } = process.env;

const client = redis
  .createClient({
    host: REDIS_HOST,
    port: +(REDIS_PORT || 6379),
  })
  .on('ready', () => {
    console.log(`Redis ready on ${REDIS_HOST}:${REDIS_PORT}`);
  });

export default client;
