import '../src/env';
import { sequelize } from '../src/services/sequelize';
import { Event, TicketType } from '../src/models';
import { readFileSync } from 'fs';

sequelize.options.logging = false;
seed();

export async function seed() {
  try {
    console.info('DB seed start...');

    console.info('creating event data..');
    const eventData = readFileSync('./db/events.json').toString();
    const eventsBulk = JSON.parse(eventData);
    await Event.bulkCreate(eventsBulk);

    console.info('creating tickettype data..');
    const ticketTypeData = readFileSync('./db/ticketTypes.json').toString();
    const ticketTypeBulk = JSON.parse(ticketTypeData);
    await TicketType.bulkCreate(ticketTypeBulk);

    console.info('DB seed end...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
