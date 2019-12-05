import { Sequelize } from 'sequelize-typescript';
import { Event, UserTicket, TicketType, User } from '../models';
import { readJSONData } from './readJSON';
import { resolve } from 'path';

const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_NAME } = process.env;
const SEED_DIR = resolve(__dirname, '../../db_seeds');

export const sequelize = new Sequelize({
  host: DB_HOST,
  port: DB_PORT ? +DB_PORT : 3306,
  username: DB_USER,
  password: DB_PW,
  database: DB_NAME,
  dialect: 'mariadb',
  models: [Event, UserTicket, TicketType, User],
});

export async function migrate() {
  console.info('DB migration start...');
  await sequelize.sync();
  console.info('DB migration end...');
}

export async function seed() {
  console.info('DB seed start...');
  // UserData 추가
  const usersPath = resolve(SEED_DIR, 'users.json');
  const usersData = await readJSONData<User>(usersPath);
  await User.bulkCreate(usersData);

  // EventData 추가
  const eventPath = resolve(SEED_DIR, 'events.json');
  const eventData = await readJSONData<Event>(eventPath);
  await Event.bulkCreate(eventData);

  // TicketData 추가
  const ticketPath = resolve(SEED_DIR, 'ticketTypes.json');
  const ticketData = await readJSONData<TicketType>(ticketPath);
  await TicketType.bulkCreate(ticketData);

  // OrderTikcetData 추가
  const userTicketPath = resolve(SEED_DIR, 'userTickets.json');
  const userTicketData = await readJSONData<UserTicket>(userTicketPath);
  await UserTicket.bulkCreate(userTicketData);

  console.info('DB seed end...');
}
