import * as redis from 'redis';
import 'env';
import { sequelize } from 'utils/sequelize';
import { TicketType } from 'models';
import winston from 'utils/winston';

const { REDIS_PORT, REDIS_HOST } = process.env;

export const client = redis
  .createClient({
    host: REDIS_HOST,
    port: +(REDIS_PORT || 6379),
  })
  .on('ready', () => {
    winston.info(`Redis ready on ${REDIS_HOST}:${REDIS_PORT}`);
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
    client.hmset(`${ticket.id}`, ticket);
    client.hgetall(`${ticket.id}`);
  });
  client.quit();
};

export const redisNonBlockKey = (ticketTypeId: number) => {
  return new Promise((resolve, reject) => {
    client.hset(`${ticketTypeId}`, 'isBlock', '0', (err, res) => {
      if (err) reject();
      resolve(res);
    });
  });
};

export const redisDeleteKey = async () => {
  const tickets = await TicketType.findAll();
  await sequelize.close();

  tickets.map(({ id }) => client.del(`${id}`));
  client.quit();
};

export function redisCreateKey(
  id: string,
  ticket: Pick<TicketType, 'leftCnt' | 'salesStartAt' | 'salesEndAt'>,
): boolean {
  return client.hmset(id, {
    id,
    isBlock: ticket.leftCnt > 0 ? 0 : 1,
    salesStartAt: ticket.salesStartAt.getTime(),
    salesEndAt: ticket.salesEndAt.getTime(),
  });
}

export default client;
