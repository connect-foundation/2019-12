import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import * as middlewares from './middlewares';
import {
  requireLogin,
  singleFileUpload,
  requireSingleFile,
  limitSizeSingleFile,
} from 'routes/middlewares';
import { badRequestHandler } from 'utils/errorHandler';

const router = Router();

router.param('eventId', middlewares.requestParamHandler);
router.get('/', validators.getEvents, badRequestHandler, controllers.getEvents);
router.post(
  '/',
  requireLogin,
  singleFileUpload('mainImg'),
  requireSingleFile('mainImg'),
  limitSizeSingleFile(1024 * 1024 * 10),
  validators.createEvent,
  badRequestHandler,
  controllers.createEvent,
);
router.get('/coordinate', controllers.convertPlaceToCoordinate);
router.get('/:eventId', controllers.getEvent);
router.get('/:eventId/tickets', controllers.getEventTickets);

export default router;
