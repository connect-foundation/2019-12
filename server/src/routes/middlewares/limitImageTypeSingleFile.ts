import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.fileType?.mime.startsWith('image'))
    return res.sendStatus(BAD_REQUEST);

  next();
};
