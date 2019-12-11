import { Request, Response, NextFunction } from 'express';
import { getUserTicketsByUserId } from 'services';
import { NO_CONTENT } from 'http-status';

export async function getUserTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userTickets = await getUserTicketsByUserId(req.user!.id);
    if (!userTickets.length) res.status(NO_CONTENT);
    res.send(userTickets);
  } catch (err) {
    next(err);
  }
}
