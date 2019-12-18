import { Request, Response, NextFunction } from 'express';
import { deleteUserTicketById } from 'services/userTickets';
import { NO_CONTENT, BAD_REQUEST } from 'http-status';

export async function deleteUserTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { ticketId } = req.body;
    await deleteUserTicketById(ticketId, req.user!.id);

    res.sendStatus(NO_CONTENT);
  } catch (err) {
    if (err === 'cannot refund ticket')
      return res
        .status(BAD_REQUEST)
        .send({ message: '환불 날짜가 지났습니다.' });
    if (err === 'no ticket exist')
      return res.status(BAD_REQUEST).send({ message: '티켓이 없습니다.' });
    next(err);
  }
}
