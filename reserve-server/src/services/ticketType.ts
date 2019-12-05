import { Transaction, literal } from 'sequelize';
import { TicketType } from '../models';

export const getTicketType = (transaction: Transaction, ticketId: number) =>
  TicketType.findOne({
    where: { id: ticketId },
    transaction,
  });

export const updateTicketType = (
  transaction: Transaction,
  ticketId: number,
  orderTicketNum: number,
) =>
  TicketType.update(
    { leftCnt: literal(`left_cnt -  ${orderTicketNum}`) },
    { where: { id: ticketId }, transaction },
  );
