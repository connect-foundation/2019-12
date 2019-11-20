import '../src/env';
import { sequelize, seed } from '../src/services/sequelize';

sequelize.options.logging = false;
seed();
