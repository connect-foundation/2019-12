import { Event, TicketType } from 'models';
import { Transaction } from 'sequelize';
import { sequelize } from 'utils/sequelize';
import { redisCreateKey } from 'utils/redis';

export default async (
  event: Partial<Event>,
  ticket: Partial<TicketType>,
): Promise<{ eventId: number; ticketId: number }> => {
  return sequelize.transaction<{ eventId: number; ticketId: number }>(
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
};
