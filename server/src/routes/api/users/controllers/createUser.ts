import { Request, Response } from 'express';
import { setUserInfo } from '../../../../services';

export async function createUser(req: Request, res: Response) {
  const { exist, id, googleId, firstName, lastName, phoneNumber } = req.body;
  // Exist가 False일 경우, Token이 회원가입이 안되어 있음을 말함.
  if (!exist) {
    const result = await setUserInfo(
      id,
      googleId,
      firstName,
      lastName,
      phoneNumber,
    );
    if (result[0] === 1) {
      res.send({ message: 'Success Signup' });
    } else {
      res.status(400).send({ message: 'Cannot Signup' });
    }
  } else {
    res.status(400).send({ message: 'Cannot Signup' });
  }
}
