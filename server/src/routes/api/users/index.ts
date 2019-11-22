import * as express from 'express';

import createUser from './controllers/createUser';

const router = express.Router();

// 전체를 관통할 미들웨어를 이곳에 서술
router.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
  },
);
// parameter를 뽑을 때 사용할 미들웨어
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

router.get('/:userId/events');
router
  .route('/:userId')
  .get((req: express.Request, res: express.Response) => {
    res.send('GET /users');
  })
  .patch();
router.post('/', createUser);

export default router;
