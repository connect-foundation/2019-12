import { Request, Response, NextFunction } from 'express';
import { placeToCoordinate } from '../../../../services/events';
import { NO_CONTENT } from 'http-status';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { latitude, longitude } = await placeToCoordinate(req.query.place);
    res.json({ latitude, longitude });
  } catch (error) {
    if (error.message === 'ZERO_RESULTS') return res.sendStatus(NO_CONTENT);
    next(error);
  }
};
