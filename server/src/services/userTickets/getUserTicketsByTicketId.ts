import { User, UserTicket } from 'models';
import { FindAttributeOptions, WhereOptions, Includeable } from 'sequelize';

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

export default async (ticketTypeId: number): Promise<AttendantTicket[]> => {
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
};
