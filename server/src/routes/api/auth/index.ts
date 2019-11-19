import * as express from 'express';
import * as passport from 'passport';

import { CLIENT_URL } from '../../../config/server_url';

const router = express.Router();

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: express.Request, res: express.Response) => {
    try {
      const { state } = req.query;
      const { returnTo } = JSON.parse(Buffer.from(state, 'base64').toString());
      if (typeof returnTo === 'string' && returnTo.startsWith('/')) {
        return res.redirect(returnTo);
      }
    } catch {
      // just redirect normally below
    }
  },
);

router.get(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { returnTo } = req.query;
    const state = returnTo
      ? Buffer.from(JSON.stringify({ returnTo })).toString('base64')
      : undefined;
    const authenticator = passport.authenticate('google', {
      scope: ['profile'],
      state,
    });
    authenticator(req, res, next);
  },
);

export default router;
