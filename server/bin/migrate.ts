import '../src/env';
import { sequelize } from '../src/services/sequelize';

(async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.info('DB Migration...');
  }
})();
