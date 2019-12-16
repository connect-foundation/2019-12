import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';

export default (maxSize: number) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file && req.file.size > maxSize) return res.sendStatus(BAD_REQUEST);
  next();
};
