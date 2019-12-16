import {
  Op,
  Order,
  WhereOptions,
  Includeable,
  FindAttributeOptions,
  Transaction,
} from 'sequelize';
import { sequelize } from 'utils/sequelize';
import { Event, TicketType, User } from 'models';
import { redisCreateKey } from 'utils/redis';

export async function getEvents(limit = 20, startAt: Date): Promise<Event[]> {
  const where: WhereOptions = startAt
    ? { isPublic: true, startAt: { [Op.lt]: startAt } }
    : { isPublic: true };
  const attributes: FindAttributeOptions = {
    exclude: ['isPublic', 'createdAt', 'updatedAt'],
  };
  const order: Order = [['startAt', 'DESC']];
  const include: Includeable[] = [
    {
      model: TicketType,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
    { model: User, attributes: ['id', 'lastName', 'firstName'] },
  ];

  return await Event.findAll({ where, attributes, limit, order, include });
}

export async function getEventById(id: number): Promise<Event> {
  const where: WhereOptions = { id };
  const attributes: FindAttributeOptions = {
    exclude: ['isPublic', 'createdAt', 'updatedAt'],
  };
  const include: Includeable[] = [
    {
      model: TicketType,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
    { model: User, attributes: ['id', 'lastName', 'firstName'] },
  ];

  const event = await Event.findOne({ where, attributes, include });
  if (!event) throw Error('Not Found');

  return event;
}

export async function createEventAndTicket(
  event: Partial<Event>,
  ticket: Partial<TicketType>,
): Promise<{ eventId: number; ticketId: number }> {
  return sequelize.transaction<{ eventId: number; ticketId: number }>(
    async (transaction: Transaction) => {
      const newEvent = await Event.create(event, { transaction });
      const newTicket = await TicketType.create(
        {
          ...ticket,
          leftCnt: ticket.quantity,
          eventId: newEvent.id,
        },
        { transaction },
      );
      const { id, leftCnt, salesStartAt, salesEndAt } = newTicket;
      redisCreateKey(`${id}`, { leftCnt, salesStartAt, salesEndAt });
      return { eventId: newEvent.id, ticketId: newTicket.id };
    },
  );
}

export async function getUserEventsByUserId(userId: number): Promise<Event[]> {
  const where: WhereOptions = { userId };
  const order: Order = [['startAt', 'DESC']];
  const attributes: FindAttributeOptions = {
    exclude: [
      'createdAt',
      'updatedAt',
      'desc',
      'latitude',
      'longitude',
      'isPublic',
    ],
  };
  return await Event.findAll({ where, order, attributes });
}
