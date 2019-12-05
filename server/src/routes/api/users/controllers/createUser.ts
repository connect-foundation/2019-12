import { Request, Response, NextFunction } from 'express';
import { setUserInfo } from '../../../../services';

import { generateJWT, verifyJWT } from '../../../../utils/jwt';

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const requestToken = req.cookies.UID;
    const { exist } = await verifyJWT(requestToken);
    const { id, email, googleId, firstName, lastName, phoneNumber } = req.body;
    // Exist가 False일 경우, Token이 회원가입이 안되어 있음을 말함.
    if (exist) return res.status(400).send({ message: 'Cannot Signup' });
    const result = await setUserInfo(
      id,
      googleId,
      firstName,
      lastName,
      phoneNumber,
    );
    if (result[0] !== 1)
      return res.status(400).send({ message: 'Cannot Signup' });
    const responseToken = await generateJWT(true, id, googleId, email);
    res
      .cookie('UID', responseToken, {
        maxAge: 1000 * 60 * 60 * 60,
      })
      .send({ message: 'Success Signup' });
  } catch (err) {
    next(err);
  }
}
