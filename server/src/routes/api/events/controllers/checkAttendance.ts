import { Request, Response, NextFunction } from 'express';
import { toggleUserAttendance } from 'services';
import { NOT_FOUND, BAD_REQUEST } from 'http-status';

export default async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id;
  const event = req.event!;
  if (userId !== event.userId) return res.sendStatus(BAD_REQUEST);

  try {
    const { attendance } = req.body;
    const ticketTypeId = event.ticketType.id;
    const userTicketId = +req.params.ticketId;
    const toggleResult = await toggleUserAttendance(
      userTicketId,
      ticketTypeId,
      attendance,
    );

    if (toggleResult[0] === 0) return res.sendStatus(NOT_FOUND);
    res.send({ id: userTicketId, isAttendance: attendance });
  } catch (err) {
    next(err);
  }
};
