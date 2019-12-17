import { Event, TicketType, UserTicket } from 'models';
import { FindAttributeOptions, WhereOptions, Includeable } from 'sequelize';

interface BoughtEvent extends Partial<Event> {
  userTickets: UserBoughtTicket[];
  ticket: Partial<TicketType>;
}

interface UserBoughtTicket {
  id: number;
  ticketTypeId: number;
  userId: number;
  isAttendance: boolean;
  createdAt: Date;
}

function userTicketReducer(acc: BoughtEvent[], cur: UserTicket): BoughtEvent[] {
  const {
    ticketType: { event, ...ticketTypes },
    ...userTicket
  } = cur.get({ plain: true }) as UserTicket;
  let eventIndex = acc.findIndex(event => event.id === cur.ticketType.eventId);
  if (eventIndex === -1) {
    acc.push({
      ...event,
      ticket: ticketTypes,
      userTickets: [],
    });
    eventIndex = acc.length - 1;
  }
  acc[eventIndex].userTickets.push(userTicket);
  return acc;
}

export default async (userId: number): Promise<BoughtEvent[]> => {
  const attributes: FindAttributeOptions = {
    exclude: ['updatedAt'],
  };
  const where: WhereOptions = { userId };
  const include: Includeable[] = [
    {
      model: TicketType,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Event,
          order: [['startAt', 'ASC']],
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'desc',
              'latitude',
              'longitude',
              'isPublic',
            ],
          },
        },
      ],
    },
  ];
  const result = await UserTicket.findAll({ include, attributes, where });
  return result.reduce<BoughtEvent[]>(userTicketReducer, []);
};
