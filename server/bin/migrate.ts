import '../src/env';
import { sequelize } from '../src/services/sequelize';

(async () => {
  try {
    console.info('DB migration start...');
    await sequelize.sync();
    console.info('DB migration end...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
