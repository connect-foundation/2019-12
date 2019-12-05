import '../src/env';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

import indexRouter from './routes/api';

import {
  notFoundHandler,
  internelServerErrorHandler,
} from '../src/utils/errorHandler';

const { CLIENT_URL } = process.env;

const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    exposedHeaders: ['Uid', 'Access-Token'],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);
app.get('/', (req, res) => res.send('OK'));

app.use(notFoundHandler);
app.use(internelServerErrorHandler);

export default app;
