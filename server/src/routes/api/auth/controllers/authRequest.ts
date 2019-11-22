import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

export const authRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { returnTo } = req.query;
  const state = returnTo
    ? Buffer.from(JSON.stringify({ returnTo })).toString('base64')
    : undefined;
  const authenticator = passport.authenticate('google', {
    scope: ['email', 'profile'],
    state,
  });
  authenticator(req, res, next);
};
