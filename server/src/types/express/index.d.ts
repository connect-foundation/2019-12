import { Event } from '../../models';
import { FileTypeResult } from 'file-type';

declare global {
  namespace Express {
    interface User {
      id: number;
    }

    interface Request {
      event?: Event;
      user?: User;
      fileType?: FileTypeResult;
    }
  }
}
