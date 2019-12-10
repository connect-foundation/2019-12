import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from 'utils/jwt';

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.UID;
  try {
    const { exist, id, googleId, email } = await verifyJWT(token);
    res.send({
      exist,
      id,
      googleId,
      email,
    });
  } catch (err) {
    next(err);
  }
};
