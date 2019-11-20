import { Sequelize } from 'sequelize-typescript';
import {
  Event,
  Order,
  OrderTicket,
  TicketSubscription,
  TicketType,
  User,
} from '../models';

const { DB_HOST, DB_USER, DB_PW, DB_NAME } = process.env;

export const sequelize = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PW,
  database: DB_NAME,
  dialect: 'mariadb',
  models: [Event, Order, OrderTicket, TicketSubscription, TicketType, User],
});

export async function migrate() {
  try {
    console.info('DB migration start...');
    await sequelize.sync();
    console.info('DB migration end...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
