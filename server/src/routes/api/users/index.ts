import * as express from 'express';
import * as controllers from './controllers';
import * as validators from './validators';
import { badRequestHandler } from '../../../utils/errorHandler';
//import * as validator from './validators';

const router = express.Router();

router.post('/:userId', controllers.getUser);
router.post(
  '/',
  validators.createUser,
  badRequestHandler,
  controllers.createUser,
);

export default router;
