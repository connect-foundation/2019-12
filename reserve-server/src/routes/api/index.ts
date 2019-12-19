import { Router } from 'express';

import * as controllers from './controllers';

const router = Router();

router.post(
  '/users/reserve/check',
  controllers.checkTicket,
  controllers.authUser,
  (req, res) => {
    res.send();
  },
);
router.post(
  '/users/reserve',
  controllers.checkTicket,
  controllers.authUser,
  controllers.orderTicket,
);

export default router;
