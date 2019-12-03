import { Request, Response } from 'express';
import { getUserById } from '../../../../services';

export async function getUser(req: Request, res: Response) {
  const { exist } = req.body;

  // Exist가 False일 경우, Token이 회원가입이 안되어 있음을 말함.
  if (exist) {
    const result = await getUserById(+req.params.userId);
    console.log(result);
    if (result) {
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
    } else {
      res.status(400).send({ message: 'Cannot get data' });
    }
  } else {
    res.status(400).send({ message: 'Cannot get data' });
  }
}
