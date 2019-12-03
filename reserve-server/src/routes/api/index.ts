import { Router } from 'express';

import userRouter from './users';

const router = Router();

router.use('/users', userRouter);

export default router;
