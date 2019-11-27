import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';

const { JWT_SECURE } = process.env;

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.UID;
  JWT.verify(token, JWT_SECURE || '', (err: JWT.VerifyErrors, decoded: any) => {
    if (err) {
      next(err);
    }
    const decodeToken = {
      exist: decoded.exist,
      id: decoded.id,
      googleId: decoded.googleId,
      email: decoded.email,
    };
    res.send(decodeToken);
  });
};
