import * as express from 'express';
// types
// import Request from '../../../../types/Request';
// Controllers
import createUser from './controller/createUser';

const router = express.Router();

// 전체를 관통할 미들웨어를 이곳에 서술
router.use();
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
  .get()
  .patch();
router.post('/', createUser);
export = router;
