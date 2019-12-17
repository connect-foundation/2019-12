import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';

export default (paramName: string) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const param: string = req.params[paramName];
  const isInteger: boolean = Number.isInteger(+param);

  if (!isInteger) return res.sendStatus(BAD_REQUEST);
  next();
};
