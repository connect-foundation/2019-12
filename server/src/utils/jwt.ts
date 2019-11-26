import * as JWT from 'jsonwebtoken';
const { JWT_SECURE } = process.env;

export function generateJWT(
  exist: boolean,
  id: number,
  googleId: number,
  email: string,
): Promise<JWT.Secret> {
  return new Promise((resolve, reject) => {
    JWT.sign(
      {
        exist,
        id,
        googleId,
        email,
      },
      JWT_SECURE || '',
      {
        // Expire Date를 외부로 빼야함.
        expiresIn: 1000 * 60 * 60 * 24,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
}
