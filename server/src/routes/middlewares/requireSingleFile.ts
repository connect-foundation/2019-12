import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';

export default (fieldName?: string) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file || (fieldName && req.file.fieldname !== fieldName))
    return res.sendStatus(BAD_REQUEST);
  next();
};
