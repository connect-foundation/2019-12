import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth';
import {
  clientId as GOOGLE_CLIENT_ID,
  clientSecret as GOOGLE_CLIENT_SECRET,
} from '../config/oauth_google';

passport.serializeUser((user, done) => {
  done(null, user);
});
