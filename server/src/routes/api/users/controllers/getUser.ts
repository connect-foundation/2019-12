import { Request, Response } from 'express';
import { getUserById } from '../../../../services';

export async function getUser(req: Request, res: Response) {
  const result = await getUserById(+req.params.userId);
  if (!result) return res.status(400).send({ message: 'Cannot get data' });
  const { id, firstName, lastName, phoneNumber, email, googleId } = result;
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
}
