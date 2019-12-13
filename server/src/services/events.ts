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
import axios from 'axios';
import { stringify } from 'query-string';
import { redisCreateKey } from 'utils/redis';

export async function createEventAndTicket(
  event: Partial<Event>,
  ticket: Partial<TicketType>,
) {
  return await sequelize.transaction<{ eventId: number; ticketId: number }>(
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
