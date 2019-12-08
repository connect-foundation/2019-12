import { Transaction } from 'sequelize';
import {
  countUserTicket,
  getTicketType,
  updateTicketType,
  updateUserTicket,
} from './';
import { SOLD_OUT, NOT_EXIST, NOT_OPEN, EXCEED_LIMIT } from '../constants';
import { TicketType } from '../models';
import redis from '../utils/redis';

export const orderTransaction = async (
  transaction: Transaction,
  userId: number,
  ticketId: number,
  orderTicketNum: number,
) => {
  //현재 티켓이 구매가능한 상태인지 확인해야함.
  // 이 두가지를 Promise.all로 변경해야함.
  const [userTicketNum, ticket] = await Promise.all<number, TicketType>([
    countUserTicket(transaction, userId, ticketId),
    getTicketType(transaction, ticketId),
  ]);

  if (ticket.leftCnt === 0) {
    redis.hset(`${ticketId}`, 'isBlock', '1');
    throw SOLD_OUT; // 티켓이 다 팔렸을 경우
  }
  if (!ticket) throw NOT_EXIST;

  if (ticket.maxCntPerPerson < userTicketNum + orderTicketNum)
    throw EXCEED_LIMIT; // 티켓의 구매 개수를 초과함

  const time = Date.now();
  if (time < +ticket.salesStartAt || time > +ticket.salesEndAt) throw NOT_OPEN; // 티켓이 아직 열리지 않음

  // 구매할 티켓이 존재할 때, 유저가 산 티켓 개수가 살 수 있는 티켓 개수보다 적을경우,
  await updateUserTicket(transaction, userId, ticketId, orderTicketNum);
  await updateTicketType(transaction, ticketId, orderTicketNum);
};
