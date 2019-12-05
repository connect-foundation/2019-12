import { Request, Response, NextFunction } from 'express';
import { getEventById } from '../../../../services/events';
import { NOT_FOUND } from 'http-status';

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
    res.sendStatus(NOT_FOUND);
  }
};
