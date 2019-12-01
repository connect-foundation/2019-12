import * as JWT from 'jsonwebtoken';
const { JWT_SECURE } = process.env;

export function generateJWT(
  exist: boolean,
  id: number,
  googleId: number,
  email: string,
): Promise<JWT.Secret> {
  const payload = {
    exist,
    id,
    googleId,
    email,
  };
  return new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      JWT_SECURE || '',
      {
        expiresIn: 1000 * 60 * 60 * 24,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
}