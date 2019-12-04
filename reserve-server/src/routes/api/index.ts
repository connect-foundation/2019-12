import { Router } from 'express';

import * as controllers from './controllers';

const router = Router();

router.post(
  '/users/ticket',
  controllers.checkTicket,
  controllers.authUser,
  controllers.orderTicket,
);

export default router;
