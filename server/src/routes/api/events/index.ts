import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import * as middlewares from './middlewares';
import { badRequestHandler } from '../../../utils/errorHandler';

const router = Router();

router.param('eventId', middlewares.requestParamHandler);
router.get('/', validators.getEvents, badRequestHandler, controllers.getEvents);
router.get('/coordinate', controllers.convertPlaceToCoordinate);
router.get('/:eventId', controllers.getEvent);
router.get('/:eventId/tickets', controllers.getEventTickets);

export default router;
