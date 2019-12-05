import { Response, NextFunction } from 'express';
import { TicketCacheData, getTicketCache } from '../../../services';

export default async (req: any, res: Response, next: NextFunction) => {
  const time = Date.now();
  const { ticketId } = req.body;

  try {
    const { isBlock, salesEndAt, salesStartAt } = (await getTicketCache(
      ticketId,
    )) as TicketCacheData;
    if (isBlock === '0' && time > +salesStartAt && time < +salesEndAt)
      return next();

    return res.status(403).send({ message: 'failure' });
  } catch (err) {
    return res.status(404).send({ message: 'no Ticket Exist' });
  }
};
