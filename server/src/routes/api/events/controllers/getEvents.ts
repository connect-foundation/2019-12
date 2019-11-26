import { Request, Response, NextFunction } from 'express';
import { getEvents } from '../../../../services/events';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { cnt: limit, lastId } = req.query;
  try {
    const events = await getEvents(limit, lastId);
    res.send(events);
  } catch (error) {
    next(error);
  }
};
