import { Request, Response, NextFunction } from 'express';
import { getUserTicketsByUserId } from 'services';
import { NO_CONTENT } from 'http-status';

export async function getUserTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) throw new Error('no user id');
    const userTickets = await getUserTicketsByUserId(req.user.id);
    if (!userTickets.length) res.status(NO_CONTENT);
    res.send(userTickets);
  } catch (err) {
    next(err);
  }
}
