import app from '../src/app';
import '../src/utils/sequelize';

(() => {
  app.listen(3000);
  console.info('Server is running...!!');
})();
