import * as express from 'express';
import * as passport from 'passport';

import * as controllers from './controllers';

const { CLIENT_URL } = process.env;

const router = express.Router();

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  controllers.authCallback,
);
router
  .route('/')
  .get(controllers.authRequest)
  .post(controllers.authToken);

export default router;
