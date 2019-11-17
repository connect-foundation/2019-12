import { Sequelize } from 'sequelize-typescript';
import {
  Event,
  Order,
  OrderTicket,
  TicketSubscription,
  TicketType,
  User,
} from '../models';

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  models: [Event, Order, OrderTicket, TicketSubscription, TicketType, User],
});
