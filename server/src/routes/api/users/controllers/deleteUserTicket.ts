import { Request, Response } from 'express';
import { deleteUserTicketById } from 'services';
import { BAD_REQUEST, NO_CONTENT, NOT_FOUND } from 'http-status';

export async function deleteUserTicket(req: Request, res: Response) {
  try {
    const { ticketId } = req.body;
    const result = await deleteUserTicketById(ticketId, +req.user!.id);
    if (!result) return res.sendStatus(NOT_FOUND);
    res.sendStatus(NO_CONTENT);
  } catch (err) {
    res.sendStatus(BAD_REQUEST);
  }
}
