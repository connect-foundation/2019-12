import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

import setUpPassport from '../src/services/passport';
import authRouter from './routes/api/auth';
import userRouter from './routes/api/users';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
setUpPassport();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

export default app;
