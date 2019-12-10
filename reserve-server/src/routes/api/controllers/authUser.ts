import { Response, NextFunction } from 'express';
import { verifyJWT } from 'utils/jwt';
import { UNAUTHORIZED } from 'http-status';
import { UNAUTH } from 'common/constants';

export default async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.UID;
  try {
    const { id } = await verifyJWT(token);
    req.user = { id };
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).send(UNAUTH);
  }
};
