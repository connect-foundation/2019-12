import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth';
import {
  clientId as GOOGLE_CLIENT_ID,
  clientSecret as GOOGLE_CLIENT_SECRET,
} from '../config/oauth_google';
import { API_URL } from '../config/server_url';

const passportGoogle = GoogleStrategy.OAuth2Strategy;

const config: GoogleStrategy.IOAuth2StrategyOption = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_URL}/api/auth/callback`,
};

export default function setUpPassport(): void {
  passport.serializeUser<string, string>((user, done) => {
    done(null, user);
  });

  passport.deserializeUser<string, string>((obj, done) => {
    done(null, obj);
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
        return done(null, { accessToken, refreshToken, profile });
      },
    ),
  );
}
