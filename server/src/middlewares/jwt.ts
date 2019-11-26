import * as JWT from 'jsonwebtoken';

export function generateJWT(
  id: number,
  googleId: number,
  email?: string,
): Promise<JWT.Secret> {
  return new Promise((resolve, reject) => {
    JWT.sign(
      {
        id,
        googleId,
        email,
      },
      'secret',
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
