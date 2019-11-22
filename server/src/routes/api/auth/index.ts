import * as express from 'express';
import * as passport from 'passport';

import { authCallback, authRequest } from './controllers';

const { CLIENT_URL } = process.env;

const router = express.Router();

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  authCallback,
);

router.get('/', authRequest);

export default router;
