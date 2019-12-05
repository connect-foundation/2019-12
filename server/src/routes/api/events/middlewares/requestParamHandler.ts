import { Request, Response, NextFunction } from 'express';
import { getEventById } from '../../../../services/events';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: string,
) => {
  try {
    const eventId = +value;
    req.event = await getEventById(eventId);
    next();
  } catch (error) {
    res.sendStatus(404);
  }
};
