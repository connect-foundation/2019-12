import '../src/env';
import '../src/utils/sequelize';
import app from '../src/app';

const { PORT } = process.env;

if (!PORT) {
  console.error('환경변수 파일에 PORT 가 필요합니다.');
  process.exit(1);
}

app.listen(PORT);
console.info('Server is running...!!');
