import { Request, Response, NextFunction } from 'express';
import { getEvents } from 'services/events';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { cnt: limit, startAt } = req.query;
  try {
    const events = await getEvents(limit, startAt);
    res.send(events);
  } catch (error) {
    next(error);
  }
};
