import { Sequelize } from 'sequelize-typescript';
import {
  Event,
  Order,
  OrderTicket,
  TicketSubscription,
  TicketType,
  User,
} from '../models';
import { readFileSync } from 'fs';

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

export async function seed() {
  try {
    console.info('DB seed start...');

    console.info('creating event data..');
    const eventData = readFileSync('../db/events.json').toString();
    const eventsBulk = JSON.parse(eventData);
    await Event.bulkCreate(eventsBulk);

    console.info('creating tickettype data..');
    const ticketTypeData = readFileSync('../db/ticketTypes.json').toString();
    const ticketTypeBulk = JSON.parse(ticketTypeData);
    await TicketType.bulkCreate(ticketTypeBulk);

    console.info('DB seed end...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
