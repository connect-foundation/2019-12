import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

import setUpPassport from './utils/passport';
import indexRouter from './routes/api';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
setUpPassport();

app.use('/api', indexRouter);

export default app;
