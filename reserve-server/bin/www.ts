import '../src/env';
import '../src/utils/sequelize';
import '../src/utils/redis';
import app from '../src/app';

const { APP_PORT } = process.env;

if (!APP_PORT) {
  console.error('환경변수 파일에 APP_PORT 가 필요합니다.');
  process.exit(1);
}

app.listen(APP_PORT);
console.info(`Server is running on ${APP_PORT}`);
