import { Sequelize } from 'sequelize-typescript';
import { Event, UserTicket, TicketType, User } from '../models';

const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_NAME } = process.env;

export const sequelize = new Sequelize({
  host: DB_HOST,
  port: DB_PORT ? +DB_PORT : 3306,
  username: DB_USER,
  password: DB_PW,
  database: DB_NAME,
  dialect: 'mariadb',
  models: [Event, UserTicket, TicketType, User],
  logging: false,
});

