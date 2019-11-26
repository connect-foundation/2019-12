import '../src/env';
import { sequelize, seed } from '../src/utils/sequelize';

sequelize.options.logging = false;

(async () => {
  try {
    await seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
