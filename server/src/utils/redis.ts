import * as redis from 'redis';
import '../env';
import { sequelize } from './sequelize';
import { TicketType } from '../models';

const { REDIS_PORT, REDIS_HOST } = process.env;

const client = redis
  .createClient({
    host: REDIS_HOST,
    port: +(REDIS_PORT || 6379),
  })
  .on('ready', () => {
    console.log(`Redis ready on ${REDIS_HOST}:${REDIS_PORT}`);
  });

export const redisMigrate = async () => {
  const tickets = await TicketType.findAll();
  await sequelize.close();

  const redisTickets = tickets.map(
    ({ id, leftCnt, salesStartAt, salesEndAt }) => {
      return {
        id,
        isBlock: leftCnt > 0 ? 0 : 1,
        salesStartAt: salesStartAt.getTime(),
        salesEndAt: salesEndAt.getTime(),
      };
    },
  );
  redisTickets.forEach(ticket => {
    client.hmset(`${ticket.id}`, ticket, redis.print);
    client.hgetall(`${ticket.id}`, (err, reply) => {
      console.log(reply);
    });
  });
  client.quit();
};

export const redisDeleteKey = async () => {
  const tickets = await TicketType.findAll();
  await sequelize.close();

  tickets.map(({ id }) => client.del(`${id}`));
  client.quit();
};

export default client;
