import { Event } from '../../models';

declare global {
  namespace Express {
    interface Request {
      event?: Event;
    }
  }
}
