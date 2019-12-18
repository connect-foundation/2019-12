import { Event, TicketType } from 'models';
import {
  WhereOptions,
  Order,
  FindAttributeOptions,
  Includeable,
} from 'sequelize';

export default async (userId: number): Promise<Partial<Event>[]> => {
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
  const include: Includeable[] = [
    {
      model: TicketType,
      attributes: ['price'],
    },
  ];
  const userEvents = await Event.findAll({ where, order, attributes, include });
  return userEvents.map(userEvent => {
    const { ticketType, ...event } = userEvent.get({ plain: true }) as Partial<
      Event
    >;
    return { price: ticketType!.price, ...event };
  });
};
