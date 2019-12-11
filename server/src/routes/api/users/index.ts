import * as express from 'express';
import * as controllers from './controllers';
import * as validators from './validators';
import { badRequestHandler } from 'utils/errorHandler';
import { requireLogin } from 'routes/middlewares';

const router = express.Router();

router.delete(
  '/ticket',
  requireLogin,
  validators.deleteUserTicket,
  badRequestHandler,
  controllers.deleteUserTicket,
);
router.get('/tickets', requireLogin, controllers.getUserTicket);
router.post('/:userId', controllers.getUser);
router.post(
  '/',
  validators.createUser,
  badRequestHandler,
  controllers.createUser,
);

export default router;
