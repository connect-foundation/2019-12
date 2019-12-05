import { Response, NextFunction } from 'express';
import { verifyJWT } from '../../../utils/jwt';

export default async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.UID;
  try {
    const { id } = await verifyJWT(token);
    req.user = { id };
    next();
  } catch (err) {
    res.status(401).send('need to login');
  }
};
