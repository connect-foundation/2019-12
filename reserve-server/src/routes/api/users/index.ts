import * as express from 'express';
import * as controllers from './controllers';
const router = express.Router();

router.param(
  'userId',
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    value: any,
    name: string,
  ) => {
    // 이곳에서 Validation 을 수행함.
    next();
  },
);
router.post('/ticket', controllers.orderTicket);

export default router;