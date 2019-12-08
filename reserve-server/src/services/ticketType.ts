import { Transaction, literal, WhereOptions } from 'sequelize';
import { TicketType } from '../models';

export const getTicketType = (transaction: Transaction, ticketId: number) => {
  const where: WhereOptions = { id: ticketId };
  return TicketType.findOne({ where, transaction });
};

export const updateTicketType = (
  transaction: Transaction,
  ticketId: number,
  orderTicketNum: number,
) => {
  const where: WhereOptions = { id: ticketId };
  return TicketType.update(
    { leftCnt: literal(`left_cnt -  ${orderTicketNum}`) },
    { where, transaction },
  );
};
