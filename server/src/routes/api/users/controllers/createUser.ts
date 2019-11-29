import { Request, Response } from 'express';
import { setUserInfo } from '../../../../services';

export async function createUser(req: Request, res: Response) {
  const isHaveAllKey = Object.keys(req.body).every(key => key !== undefined);
  console.log(isHaveAllKey);
  if (isHaveAllKey) {
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
  } else {
    res.status(400).send({ message: 'Need more body data' });
  }
}
