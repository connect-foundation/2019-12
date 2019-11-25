import { Op } from 'sequelize';
import { Event } from '../models';

export async function getEvents(limit = 20, lastId: number): Promise<Event[]> {
  const where = lastId ? { id: { [Op.gt]: lastId } } : undefined;
  return await Event.findAll({ where, limit });
}
