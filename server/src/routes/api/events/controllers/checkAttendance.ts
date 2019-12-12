import { Request, Response, NextFunction } from 'express';
import { toggleUserAttendance } from 'services';
import { NOT_FOUND } from 'http-status';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticketType = req.event!.ticketType.id;
    const userTicketId = +req.params.ticketId;

    const [toggleCount, toggleRows] = await toggleUserAttendance(
      userTicketId,
      ticketType,
    );
    if (toggleCount === 0) return res.sendStatus(NOT_FOUND);
    console.log(toggleRows[0]);
    res.send(toggleRows[0]);
  } catch (err) {
    next(err);
  }
};
