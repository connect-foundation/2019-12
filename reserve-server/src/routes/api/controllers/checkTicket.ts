import { Response, NextFunction } from 'express';
import { TicketCacheData, getTicketCache } from 'services';
import { FORBIDDEN, NOT_FOUND } from 'http-status';

export default async (req: any, res: Response, next: NextFunction) => {
  const time = Date.now();
  const { ticketId } = req.body;

  try {
    const { isBlock, salesEndAt, salesStartAt } = (await getTicketCache(
      ticketId,
    )) as TicketCacheData;
    if (isBlock === '0' && time > +salesStartAt && time < +salesEndAt)
      return next();

    return res.status(FORBIDDEN).send({ message: 'failure' });
  } catch (err) {
    return res.status(NOT_FOUND).send({ message: 'no Ticket Exist' });
  }
};
