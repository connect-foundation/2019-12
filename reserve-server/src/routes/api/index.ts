import { Router } from 'express';

import * as controllers from './controllers';

const router = Router();

router.post(
  '/users/reserve',
  controllers.checkTicket,
  controllers.authUser,
  controllers.orderTicket,
);

export default router;
