import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function badRequestHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!validationResult(req).isEmpty())
    return res.status(400).json(validationResult(req));
  next();
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.sendStatus(404);
}

export function internelServerErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error.message);
  res.sendStatus(500);
}
