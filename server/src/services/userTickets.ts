import { UserTicket, Event, TicketType, User } from 'models';
import { WhereOptions, FindAttributeOptions, Includeable } from 'sequelize';

interface BoughtEvent extends Partial<Event> {
  userTickets: UserBoughtTicket[];
  ticket: Partial<TicketType>;
}
interface AttendantTicket extends Partial<User> {
  userTickets: UserBoughtTicket[];
}
interface UserBoughtTicket {
  id: number;
  ticketTypeId: number;
  userId: number;
  isAttendance: boolean;
  createdAt: Date;
}
function eventTicketReducer(
  acc: AttendantTicket[],
  cur: UserTicket,
): AttendantTicket[] {
  const { user, ...userTicket } = cur.get({ plain: true }) as UserTicket;
  let userIndex = acc.findIndex(user => user.id === user.id);
  if (userIndex === -1) {
    acc.push({
      ...user,
      userTickets: [],
    });
    userIndex = acc.length - 1;
  }
  acc[userIndex].userTickets.push(userTicket);
  return acc;
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

export async function toggleUserAttendance(
  id: number,
  ticketTypeId: number,
  attendance: boolean,
): Promise<[number, UserTicket[]]> {
  const where: WhereOptions = { id, ticketTypeId };
  return await UserTicket.update({ isAttendance: attendance }, { where });
}
export async function getUserTicketsByTicketId(
  ticketTypeId: number,
): Promise<AttendantTicket[]> {
  const attributes: FindAttributeOptions = {
    exclude: ['updatedAt'],
  };
  const where: WhereOptions = {
    ticketTypeId,
  };
  const include: Includeable[] = [
    {
      model: User,
      attributes: {
        exclude: ['googleId', 'deviceToken', 'createdAt', 'updatedAt'],
      },
    },
  ];
  const result = await UserTicket.findAll({ where, include, attributes });
  return result.reduce<AttendantTicket[]>(eventTicketReducer, []);
}

export async function deleteUserTicketById(
  id: number,
  userId: number,
): Promise<number> {
  if (!id) throw new Error('no id input');
  const where: WhereOptions = { id, userId };
  return await UserTicket.destroy({ where });
}
