import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import * as middlewares from './middlewares';
import { requireLogin } from 'routes/middlewares';
import { badRequestHandler } from 'utils/errorHandler';

const router = Router();

router.get('/', validators.getEvents, badRequestHandler, controllers.getEvents);
router.get('/coordinate', controllers.convertPlaceToCoordinate);
router.param('eventId', middlewares.requestParamHandler);
router.get('/:eventId', controllers.getEvent);
router.get('/:eventId/tickets', controllers.getEventTickets);
router.patch(
  '/:eventId/ticket/:ticketId',
  requireLogin,
  controllers.checkAttendance,
);
router.get('/:eventId/users', requireLogin, controllers.getAttendants);

export default router;
