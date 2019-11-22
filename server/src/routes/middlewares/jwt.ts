import * as express from 'express';
//import * as jwt from 'jsonwebtoken';

//import { JWT_SECRET, JWT_EXPIRE, JWT_SUBJECT } from '../../config/jwt';


function setJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRE,
        subject: JWT_SUBJECT,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
}
export async function makeToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    // const payload = req.user;
    //req.user 객체에 id와 token 정보가 넘어올 예정임. 추후 obj 모양을 정의할 것임.
    // let token = await setJWT(payload);
    // res.cookie('auth', token, { maxAge: 1000 * 60 * 60 });
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}
