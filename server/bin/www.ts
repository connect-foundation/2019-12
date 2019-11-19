import '../src/env';
import app from '../src/app';

(() => {
  app.listen(3000);
  console.info('Server is running...!!');
})();
