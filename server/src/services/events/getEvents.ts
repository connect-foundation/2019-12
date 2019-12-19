import { Event, User, TicketType } from 'models';
import {
  Op,
  Order,
  WhereOptions,
  Includeable,
  FindAttributeOptions,
} from 'sequelize';

export default async (limit = 20, startAt: Date): Promise<Event[]> => {
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

  const events = await Event.findAll({
    where,
    attributes,
    limit,
    order,
    include,
  });

  return events.map(event => {
    if (event.ticketType.leftCnt > 0 && !event.ticketType.isPublicLeftCnt)
      event.ticketType.leftCnt = -1;
    return event;
  });
};
