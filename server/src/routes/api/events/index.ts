import { Router } from 'express';

import getEvents from './controllers/getEvents';
import { badRequestHandler } from '../../../utils/errorHandler';
import { getEventsValidation } from '../../../middlewares/event';

const router = Router();

router.get('/', getEventsValidation, badRequestHandler, getEvents);

export default router;
