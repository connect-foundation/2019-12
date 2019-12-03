import { Response, NextFunction } from 'express';
import { sequelize } from '../../../../utils/sequelize';
import { UserTicket, TicketType } from '../../../../models';
import { Transaction } from 'sequelize/types';
import * as Sequelize from 'sequelize';

export default async (req: any, res: Response, next: NextFunction) => {
  /**
   * 이미 나의 정보는 인증이 되어있는 상태로 미들웨어를 타고 올 예정임.
   * req.user 객체에 유저 정보를 담아서 주는 Middleware가 앞단에 있을 예정임.
   *
   * body{
   *  ticketId
   *  ticketOrderNumber
   * }
   */

  // const userId = req.user.id;
  // 추후에 미들웨어가 생기면 만들어야함.

  /**
   * // 현재 진행되어있지 않은 부분
   * 먼저 토큰을 까서 인증을 한번 함.
   * 티켓 id가 유효한지 검사함. & 현재 티켓이 구매 가능한 상태인지 검사함. => 만약 속도가 안나면 이곳에 Redis를 도입할 예정.
   */
  const { userId, ticketId, orderTicketNum } = req.body;
  try {
    await sequelize.transaction(
      async (t: Transaction) =>
        await OrderTransaction(t, userId, ticketId, orderTicketNum),
    );
    res.send({ message: 'success' });
  } catch (err) {
    res.status(204).send({ message: 'failure' });
  }
};

const countUserTicket = (
  transaction: Transaction,
  userId: number,
  ticketId: number,
) =>
  UserTicket.count({
    where: { userId, ticketTypeId: ticketId },
    transaction,
  });

const getTicketType = (transaction: Transaction, ticketId: number) =>
  TicketType.findOne({
    where: { id: ticketId },
    transaction,
  });

const updateUserTicket = (
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

const updateTicketType = (
  transaction: Transaction,
  ticketId: number,
  orderTicketNum: number,
) =>
  TicketType.update(
    { leftCnt: Sequelize.literal(`left_cnt -  ${orderTicketNum}`) },
    { where: { id: ticketId }, transaction },
  );


const OrderTransaction = async (
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
  if (ticket && ticket.maxCntPerPerson >= userTicketNum + orderTicketNum) {
    // 구매할 티켓이 존재할 때, 유저가 산 티켓 개수가 살 수 있는 티켓 개수보다 적을경우,
    await updateUserTicket(transaction, userId, ticketId, orderTicketNum);
    await updateTicketType(transaction, ticketId, orderTicketNum);
  } else {
    throw new Error('transaction fail');
  }
};
