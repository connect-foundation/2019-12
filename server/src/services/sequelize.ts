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
  username: 'user',
  password: 'pass',
  database: 'bookus',
  host: 'db',
  dialect: 'mariadb',
  models: [Event, Order, OrderTicket, TicketSubscription, TicketType, User],
});
