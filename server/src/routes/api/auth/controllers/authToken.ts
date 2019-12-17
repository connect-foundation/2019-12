import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from 'utils/jwt';
import { getUserById } from 'services/users';

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.UID;
  if (!token) return res.sendStatus(401);
  try {
    const { exist, id } = await verifyJWT(token);
    if (!exist) return res.sendStatus(401);
    const result = await getUserById(id);
    if (!result) return res.status(400).send({ message: 'Cannot get data' });
    const { firstName, lastName, phoneNumber, email, googleId } = result;
    const responseData = {
      id,
      firstName,
      lastName,
      phoneNumber,
      email,
      googleId,
      message: 'Success',
    };
    res.send(responseData);
  } catch (err) {
    next(err);
  }
};
