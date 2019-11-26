import '../src/env';
import '../src/utils/sequelize';
import app from '../src/app';

(() => {
  app.listen(3000);
  console.info('Server is running...!!');
})();
