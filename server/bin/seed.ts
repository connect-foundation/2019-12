import 'env';
import { sequelize, seed } from 'utils/sequelize';

sequelize.options.logging = false;

(async () => {
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
