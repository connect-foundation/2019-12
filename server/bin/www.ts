import '../src/env';
import 'utils/sequelize';
import 'utils/redis';
import app from 'app';
import winston from 'utils/winston';

const { APP_PORT } = process.env;

app.listen(APP_PORT);
winston.info(`Server is running on ${APP_PORT}`);
