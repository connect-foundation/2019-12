import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

const { JWT_SECURE } = process.env;

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.UID;
  JWT.verify(token, JWT_SECURE || '', (err: JWT.VerifyErrors, decoded: any) => {
    if (err) next(err);
    const value = Object.keys(decoded).every(key => key !== undefined);
    if (value) {
      const { exist, id, googleId, email } = decoded;
      const decodeToken = {
        exist,
        id,
        googleId,
        email,
      };
      res.send(decodeToken);
    } else {
      next({ message: 'unable to verify token' });
    }
  });
};
