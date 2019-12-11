import { Request, Response, NextFunction } from 'express';
import { getUserEventsByUserId } from 'services';
import { NO_CONTENT } from 'http-status';

export async function getUserEvent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) throw new Error('no user id');
    const userEvents = await getUserEventsByUserId(req.user.id);
    if (!userEvents.length) res.status(NO_CONTENT);
    res.send(userEvents);
  } catch (err) {
    next(err);
  }
}
