import { UserTicket, Event, TicketType } from 'models';
import { WhereOptions, FindAttributeOptions, Includeable } from 'sequelize';

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
  let data = acc.findIndex(a => a.id === cur.ticketType.eventId);
  if (data === -1) {
    acc.push({
      ...event,
      ticket: ticketTypes,
      userTickets: [],
    });
    data = acc.length - 1;
  }
  acc[data].userTickets.push(userTicket);
  return acc;
}

export async function getUserTicketsByUserId(
  userId: number,
): Promise<BoughtEvent[]> {
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
}

export async function deleteUserTicketById(
  id: number,
  userId: number,
): Promise<number> {
  if (!id) throw new Error('no id input');
  const where: WhereOptions = { id, userId };
  return await UserTicket.destroy({ where });
}
