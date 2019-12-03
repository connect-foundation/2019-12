import { Request, Response } from 'express';
import { setUserInfo } from '../../../../services';

import { generateJWT } from '../../../../utils/jwt';

export async function createUser(req: Request, res: Response) {
  const {
    exist,
    id,
    email,
    googleId,
    firstName,
    lastName,
    phoneNumber,
  } = req.body;
  // Exist가 False일 경우, Token이 회원가입이 안되어 있음을 말함.
  if (!exist) return res.status(400).send({ message: 'Cannot Signup' });
  const result = await setUserInfo(
    id,
    googleId,
    firstName,
    lastName,
    phoneNumber,
  );
  if (result[0] !== 1)
    return res.status(400).send({ message: 'Cannot Signup' });
  const token = await generateJWT(true, id, googleId, email);
  res
    .cookie('UID', token, {
      maxAge: 1000 * 60 * 60 * 60,
    })
    .send({ message: 'Success Signup' });
}
