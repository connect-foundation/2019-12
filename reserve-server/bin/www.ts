import 'env';
import 'utils/sequelize';
import 'utils/redis';
import app from 'app';
import winston from 'utils/winston';

const { APP_PORT } = process.env;

if (!APP_PORT) {
  winston.error('환경변수 파일에 APP_PORT 가 필요합니다.');
  process.exit(1);
}

app.listen(APP_PORT);
winston.info(`Server is running on ${APP_PORT}`);
