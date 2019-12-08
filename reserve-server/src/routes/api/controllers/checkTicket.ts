import { Response, NextFunction } from 'express';
import { TicketCacheData, getTicketCache } from '../../../services';
import { FORBIDDEN, NOT_FOUND } from 'http-status';
import { NOT_OPEN, SOLD_OUT, NOT_EXIST } from '../../../constants';

export default async (req: any, res: Response, next: NextFunction) => {
  const time = Date.now();
  const { ticketId } = req.body;

  try {
    const { isBlock, salesEndAt, salesStartAt } = (await getTicketCache(
      ticketId,
    )) as TicketCacheData;

    if (isBlock === '1') return res.status(FORBIDDEN).send(SOLD_OUT); // 티켓이 현재 다 팔림

    if (time < +salesStartAt || time > +salesEndAt)
      return res.status(FORBIDDEN).send(NOT_OPEN); // 티켓 구매 시간이 아님

    next();
  } catch (err) {
    return res.status(NOT_FOUND).send(NOT_EXIST);
  }
};
