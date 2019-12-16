import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import * as middlewares from './middlewares';
import { requireLogin, paramsValidator } from 'routes/middlewares';
import { badRequestHandler } from 'utils/errorHandler';

const router = Router();

router.param('eventId', middlewares.requestParamHandler);
router.get('/', validators.getEvents, badRequestHandler, controllers.getEvents);
router.get('/:eventId', paramsValidator('eventId'), controllers.getEvent);
router.get(
  '/:eventId/tickets',
  paramsValidator('eventId'),
  controllers.getEventTickets,
);
router.patch(
  '/:eventId/ticket/:ticketId',
  paramsValidator('eventId'),
  paramsValidator('ticketId'),
  requireLogin,
  controllers.checkAttendance,
);
router.get(
  '/:eventId/users',
  paramsValidator('eventId'),
  requireLogin,
  validators.checkAttendance,
  controllers.getAttendants,
);

export default router;
