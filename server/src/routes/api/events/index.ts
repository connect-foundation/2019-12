import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import * as middlewares from './middlewares';
import {
  requireLogin,
  singleFileUpload,
  requireSingleFile,
  limitSizeSingleFile,
  limitImageTypeSingleFile,
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
  limitImageTypeSingleFile,
  validators.createEvent,
  badRequestHandler,
  controllers.createEvent,
);
router.get('/coordinate', controllers.convertPlaceToCoordinate);
router.get('/:eventId', controllers.getEvent);
router.get('/:eventId/tickets', controllers.getEventTickets);
router.patch(
  '/:eventId/ticket/:ticketId',
  requireLogin,
  controllers.checkAttendance,
);
router.get(
  '/:eventId/users',
  requireLogin,
  validators.checkAttendance,
  controllers.getAttendants,
);

export default router;
