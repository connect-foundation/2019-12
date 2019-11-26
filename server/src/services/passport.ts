import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth';
const passportGoogle = GoogleStrategy.OAuth2Strategy;

import { generateJWT } from '../middlewares/jwt';
import { getUserByGoogleId, setUser } from '.';

const makeUserObj: any = async (
  exist: boolean,
  id: number,
  googleId: number,
  email: string,
) => {
  const token = await generateJWT(id, +googleId, email);
  return {
    exist,
    googleId: +googleId,
    email,
    token,
  };
};

const { API_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const config: GoogleStrategy.IOAuth2StrategyOption = {
  clientID: `${CLIENT_ID}`,
  clientSecret: `${CLIENT_SECRET}`,
  callbackURL: `${API_URL}/api/auth/callback`,
};

export default function setUpPassport(): void {
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  passport.use(
    new passportGoogle(
      config,
      async (
        accessToken: string,
        refreshToken: string,
        profile: GoogleStrategy.Profile,
        done: GoogleStrategy.VerifyFunction,
      ) => {
        const { id: googleId, emails } = profile;

        // 이메일이 존재하지 않을 경우를 검사함
        let email = null;
        if (emails !== undefined) {
          email = emails[0].value;
        } else {
          // 이메일이 존재하지 않을 경우
          return done(null, false, { message: 'any email exist' });
        }

        // User 정보가 있는지에 대한 검사.
        try {
          const user = await getUserByGoogleId(+googleId);
          if (user) {
            const userObj = await makeUserObj(true, user.id, googleId, email);
            return done(null, userObj, { message: 'Success' });
          } else {
            const insertUser = await setUser(+googleId, email);
            if (insertUser !== null) {
              const userObj = await makeUserObj(
                false,
                insertUser.id,
                googleId,
                email,
              );
              return done(null, userObj, { message: 'User Not Exist' });
            } else {
              return done(null, false, { message: 'Duplicate User' });
            }
          }
        } catch (err) {
          console.log(err);
        }
      },
    ),
  );
}
