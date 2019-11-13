import * as express from 'express';
// Router Imports
import userRouter from './routes/v1/api/user';

const app = express();


app.use('/api/users', userRouter);

export default app;
