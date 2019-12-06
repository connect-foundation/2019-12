import { Transaction, WhereOptions } from 'sequelize';
import { UserTicket } from '../models';

export const updateUserTicket = (
  transaction: Transaction,
  userId: number,
  ticketId: number,
  orderTicketNum: number,
) => {
  const obj = {
    ticketTypeId: ticketId,
    userId,
    isAttendance: false,
  };
  const array = [];
  let size = orderTicketNum;
  while (size--) array[size] = obj;
  return UserTicket.bulkCreate(array, { transaction });
};

export const countUserTicket = (
  transaction: Transaction,
  userId: number,
  ticketId: number,
) => {
  const where: WhereOptions = { userId, ticketTypeId: ticketId };
  return UserTicket.count({ where, transaction });
};
