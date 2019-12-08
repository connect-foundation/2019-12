import { Response, NextFunction } from 'express';
import { TicketCacheData, getTicketCache } from '../../../services';
import { FORBIDDEN, NOT_FOUND } from 'http-status';

export default async (req: any, res: Response, next: NextFunction) => {
  const time = Date.now();
  const { ticketId } = req.body;

  try {
    const { isBlock, salesEndAt, salesStartAt } = (await getTicketCache(
      ticketId,
    )) as TicketCacheData;

    if (isBlock === '1')
      return res.status(FORBIDDEN).send({
        state: 1,
        message: 'ticket sold out',
      }); // 티켓이 현재 다 팔림

    if (time < +salesStartAt || time > +salesEndAt)
      return res.status(FORBIDDEN).send({
        state: 0,
        message: 'wrong date',
      }); // 티켓 구매 시간이 아님

    next();
  } catch (err) {
    return res.status(NOT_FOUND).send({
      message: 'wrong number of ticket',
    });
  }
};
