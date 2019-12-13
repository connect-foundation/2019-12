import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import * as middlewares from './middlewares';
import {
  requireLogin,
  singleFileUpload,
  requireSingleFile,
  limitSizeSingleFile,
  singleFileLimitImageType,
} from 'routes/middlewares';
import { badRequestHandler } from 'utils/errorHandler';

const router = Router();

router.post(
  '/',
  requireLogin,
  singleFileUpload('mainImg'),
  requireSingleFile('mainImg'),
  limitSizeSingleFile(1024 * 1024 * 10),
  singleFileLimitImageType,
  validators.createEvent,
  badRequestHandler,
  controllers.createEvent,
);

export default router;
