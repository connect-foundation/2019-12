import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';

export function badRequestHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!validationResult(req).isEmpty())
    return res.status(BAD_REQUEST).json(validationResult(req));
  next();
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.sendStatus(NOT_FOUND);
}

export function internelServerErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error.message);
  res.sendStatus(INTERNAL_SERVER_ERROR);
}
