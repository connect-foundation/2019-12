import '../src/env';
import app from '../src/app';
import '../src/services/sequelize';

(() => {
  app.listen(3000);
  console.info('Server is running...!!');
})();
