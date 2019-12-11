import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, NO_CONTENT } from 'http-status';
import { getUserTicketsByTicketId } from 'services';

export async function getAttendants(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.event || !req.user) throw new Error('middleware error');
    if (req.event.userId !== req.user.id) return res.sendStatus(BAD_REQUEST);
    const userTickets = await getUserTicketsByTicketId(req.event.ticketType.id);
    if (!userTickets.length) return res.sendStatus(NO_CONTENT);
    res.send(userTickets);
  } catch (err) {
    next(err);
  }
}
