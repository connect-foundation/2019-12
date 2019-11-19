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
  password: DB_PW || '',
  database: DB_NAME,
  dialect: 'mariadb',
  models: [Event, Order, OrderTicket, TicketSubscription, TicketType, User],
});
