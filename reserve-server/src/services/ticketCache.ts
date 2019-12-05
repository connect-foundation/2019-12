import redis from '../utils/redis';

export type TicketCacheData = {
  id: string;
  isBlock: string;
  salesStartAt: string;
  salesEndAt: string;
};

export const getTicketCache = (ticketId: string) =>
  new Promise((resolve, reject) => {
    redis.hgetall(ticketId, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  });
