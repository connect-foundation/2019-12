import { User, Event, TicketType } from 'models';
import { WhereOptions, FindAttributeOptions, Includeable } from 'sequelize';

export default async (id: number): Promise<Event> => {
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

  if (event.ticketType.leftCnt > 0 && !event.ticketType.isPublicLeftCnt)
    event.ticketType.leftCnt = -1;

  return event;
};
