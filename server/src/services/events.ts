import {
  Op,
  Order,
  WhereOptions,
  Includeable,
  FindAttributeOptions,
} from 'sequelize';
import { Event, TicketType, User } from 'models';
import axios from 'axios';
import { stringify } from 'query-string';
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

interface CoordinateRespone {
  candidates: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
  status: 'OK' | 'ZERO_RESULTS';
}

export async function placeToCoordinate(
  input: string,
): Promise<{ latitude: number; longitude: number }> {
  const queryString = stringify({
    key: process.env.GOOGLE_MAP_API_KEY,
    inputtype: 'textquery',
    language: 'ko',
    fields: 'geometry/location',
    input,
  });
  const {
    data: { candidates, status },
  } = await axios.get<CoordinateRespone>(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${queryString}`,
  );
  if (status !== 'OK') throw new Error(status);

  const { lat: latitude, lng: longitude } = candidates[0].geometry.location;
  return { latitude, longitude };
}

export async function createEventAndTicket(
  event: Partial<Event>,
  ticket: Partial<TicketType>,
) {
  // TODO : 트랜잭션으로 리팩토링
  const newEvent = await Event.create(event);
  const newTicket = await TicketType.create({
    ...ticket,
    leftCnt: ticket.quantity,
    eventId: newEvent.id,
  });

  const { id, leftCnt, salesStartAt, salesEndAt } = newTicket;
  redisCreateKey(`${id}`, { leftCnt, salesStartAt, salesEndAt });

  return { eventId: newEvent.id, ticketId: newTicket.id };
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
