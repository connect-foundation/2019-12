import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from 'utils/jwt';
import { UNAUTHORIZED } from 'http-status';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.UID;
  try {
    if (!token) throw new Error('no token');
    const { exist, id } = await verifyJWT(token);
    if (!exist) throw new Error('no user exist');
    req.user = { id: +id };
    next();
  } catch (err) {
    res.status(UNAUTHORIZED).send({
      message: 'unauthorized',
    });
  }
};
