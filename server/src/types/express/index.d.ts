import { Event } from '../../models';

declare global {
  namespace Express {
    interface User {
      id: number;
    }
    interface Request {
      event?: Event;
      user?: User;
    }
  }
}
