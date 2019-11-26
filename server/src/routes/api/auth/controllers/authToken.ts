import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
const { JWT_SECURE } = process.env;

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.UID;
  console.log(token);
  JWT.verify(token, JWT_SECURE || '', (err: any, decoded: any) => {
    console.log(decoded);
    res.send(decoded);
  });
  res.send();
};
