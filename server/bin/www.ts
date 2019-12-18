import '../src/env';
import 'utils/sequelize';
import 'utils/redis';
import app from 'app';

const { APP_PORT } = process.env;

app.listen(APP_PORT);
console.info(`Server is running on ${APP_PORT}`);
