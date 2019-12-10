import { UserTicket, Event, TicketType } from 'models';
import { WhereOptions, FindAttributeOptions, Includeable } from 'sequelize';

interface UserTicketEvent {
  id: number;
  userId: number;
  title: string;
  startAt: Date;
  endAt: Date;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  ticket: TicketRaw;
  userTickets: Array<UserTicketRaw>;
}
interface EventRaw {
  id: number;
  userId: number;
  title: string;
  startAt: Date;
  endAt: Date;
  place: string;
  address: string;
  placeDesc: string;
  mainImg: string;
  desc: any;
  latitude: any;
  longitude: any;
  isPublic: any;
}
interface TicketRaw {
  id: number;
  eventId: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  leftCnt: number;
  isPublicLeftCnt: boolean;
  maxCntPerPerson: number;
  salesStartAt: Date;
  salesEndAt: Date;
  refundEndAt: Date;
  event?: EventRaw;
}
interface UserTicketRaw {
  id: number;
  ticketTypeId: number;
  userId: number;
  isAttendance: boolean;
  createdAt: Date;
  ticketType?: TicketRaw;
}

function userTicketReducer(
  acc: Array<UserTicketEvent>,
  cur: UserTicket,
): Array<UserTicketEvent> {
  const current = cur.get({ plain: true }) as UserTicket;
  const { ticketType, ...userTickets } = current;
  const { event, ...ticketTypes } = ticketType!;
  const { desc, latitude, longitude, isPublic, ...events } = event!;
  const obj = {
    ...events,
    ticket: ticketTypes,
    userTickets: [],
  } as UserTicketEvent;
  if (!acc.includes(obj)) acc.push(obj);
  acc.find(cur => cur.id === obj.id)!.userTickets.push(userTickets);
  return acc;
}

export async function getUserTicketsByUserId(
  userId: number,
): Promise<Array<UserTicketEvent>> {
  const attributes: FindAttributeOptions = {
    exclude: ['isPublic', 'updatedAt'],
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
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    },
  ];
  const result = await UserTicket.findAll({ include, attributes, where });
  return result.reduce<Array<UserTicketEvent>>(userTicketReducer, []);
}
