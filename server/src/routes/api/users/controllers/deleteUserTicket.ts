import { Request, Response, NextFunction } from 'express';
import { deleteUserTicketById } from 'services';
import { NO_CONTENT } from 'http-status';

export async function deleteUserTicket(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { ticketId } = req.body;
    await deleteUserTicketById(ticketId, +req.user!.id);

    res.sendStatus(NO_CONTENT);
  } catch (err) {
    next(err);
  }
}
