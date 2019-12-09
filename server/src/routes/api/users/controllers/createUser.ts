import { Request, Response, NextFunction } from 'express';
import { setUserInfo } from '../../../../services';
import { generateJWT, verifyJWT } from '../../../../utils/jwt';
import { BAD_REQUEST } from 'http-status';

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const requestToken = req.cookies.UID;
    const { exist } = await verifyJWT(requestToken);
    const { id, email, googleId, firstName, lastName, phoneNumber } = req.body;
    // exist가 False일 경우, Token이 회원가입이 안되어 있음을 말함.
    // true일 경우 회원가입이 되어있는 상태이므로 넘겨줌.
    if (exist)
      return res.status(BAD_REQUEST).send({ message: 'Cannot Signup' });
    const result = await setUserInfo(
      id,
      googleId,
      firstName,
      lastName,
      phoneNumber,
    );
    if (result[0] !== 1)
      return res.status(BAD_REQUEST).send({ message: 'Cannot Signup' });
    // 회원가입이 완료되었을 경우 토큰을 발급해줌.
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
