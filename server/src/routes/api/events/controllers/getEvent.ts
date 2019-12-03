import { Request, Response, NextFunction } from 'express';
import { getEventById } from '../../../../services/events';

export default async (req: Request, res: Response, next: NextFunction) => {
  const event = await getEventById(+req.params.eventId);
  res.json(event);
};
