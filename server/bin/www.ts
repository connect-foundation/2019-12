import app from '../src/app';
import { sequelize } from '../src/services/sequelize';

(async () => {
  await sequelize.sync();
  app.listen(3000);
  console.info('Server is running...!!');
})();
