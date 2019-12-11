import { Request, Response } from 'express';
import { getUserTicketsByUserId } from 'services';
import { BAD_REQUEST, NO_CONTENT } from 'http-status';

export async function getUserTicket(req: Request, res: Response) {
  try {
    if (!req.user) throw new Error('no user id');
    const result = await getUserTicketsByUserId(req.user.id);
    const userTickets = result;
    if (!userTickets.length) res.status(NO_CONTENT);
    res.send(userTickets);
  } catch (err) {
    res.sendStatus(BAD_REQUEST);
  }
}
