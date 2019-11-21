import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth';

const { API_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

const passportGoogle = GoogleStrategy.OAuth2Strategy;

const config: GoogleStrategy.IOAuth2StrategyOption = {
  clientID: `${CLIENT_ID}`,
  clientSecret: `${CLIENT_SECRET}`,
  callbackURL: `${API_URL}/api/auth/callback`,
};

export default function setUpPassport(): void {
  passport.serializeUser<string, string>((user, done) => {
    done(null, user);
  });

  passport.deserializeUser<string, string>((user, done) => {
    done(null, user);
  });

  passport.use(
    new passportGoogle(
      config,
      (
        accessToken: string,
        refreshToken: string,
        profile: GoogleStrategy.Profile,
        done: GoogleStrategy.VerifyFunction,
      ) => {
        const { id, emails } = profile;
        let email = null;
        if (typeof emails !== 'undefined') {
          email = emails[0].value;
        }
        console.log(id, email);
        return done(null, {});
      },
    ),
  );
}
