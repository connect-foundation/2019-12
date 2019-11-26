import { Router } from 'express';

import getEvents from './controllers/getEvents';
import getEventsValidator from './validators/getEvents';
import { badRequestHandler } from '../../../utils/errorHandler';

const router = Router();

router.get('/', getEventsValidator, badRequestHandler, getEvents);

export default router;
