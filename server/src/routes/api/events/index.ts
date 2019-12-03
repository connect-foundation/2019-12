import { Router } from 'express';

import * as controllers from './controllers';
import * as validators from './validators';
import { badRequestHandler } from '../../../utils/errorHandler';

const router = Router();

router.get('/', validators.getEvents, badRequestHandler, controllers.getEvents);
router.get('/:eventId', controllers.getEvent);

export default router;
