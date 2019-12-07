import * as express from 'express';
import * as controllers from './controllers';
import { body } from 'express-validator';
//import * as validator from './validators';

const router = express.Router();

router.post('/:userId', controllers.getUser);
router.post(
  '/',
  body('id')
    .exists()
    .custom(value => {
      console.log(value);
      return value === 1;
    }),
  controllers.createUser,
);

export default router;
