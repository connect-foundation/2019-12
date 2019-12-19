import { Router } from 'express';

import * as controllers from './controllers';
import { OK } from 'http-status';

const router = Router();

router.post(
  '/users/reserve/check',
  controllers.checkTicket,
  controllers.authUser,
  (req, res) => res.sendStatus(OK),
);
router.post(
  '/users/reserve',
  controllers.checkTicket,
  controllers.authUser,
  controllers.orderTicket,
);

export default router;
