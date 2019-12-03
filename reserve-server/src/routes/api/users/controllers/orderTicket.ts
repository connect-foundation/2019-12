import { Response, NextFunction } from 'express';
import { sequelize } from '../../../../utils/sequelize';
import { UserTicket, TicketType } from '../../../../models';
import { Transaction } from 'sequelize/types';

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
  const { userId, ticketId, ticketNum } = req.body;

  /**
   * 먼저 토큰을 까서 인증을 한번 함.
   * Transaction start
   * - 현재 내가 몇개의 티켓을 가지고 있는지 확인
   * - 현재 구매 가능한 개수가 내가 구매 가능한 개수에 맞는지 확인
   * - 맞음 : 구매 / 200
   * - 틀림 : 리턴 / 204
   * Transaction end
   */
  await sequelize
    .transaction(async (t: Transaction) => {
      // 이 두가지를 Promise.all로 변경해야함.
      const userTicket = await UserTicket.findAndCountAll({
        where: { userId, ticketTypeId: ticketId },
        transaction: t,
      });
      const ticket = await TicketType.findOne({
        where: { id: ticketId },
        transaction: t,
      });
      if (ticket && ticket.maxCntPerPerson >= userTicket.count + ticketNum) {
        // 구매할 티켓이 존재할 때, 유저가 산 티켓 개수가 살 수 있는 티켓 개수보다 적을경우,
        for (let i = 0; i < ticketNum; i++) {
          await UserTicket.create(
            {
              ticketTypeId: ticketId,
              userId,
              isAttendance: false,
            },
            { transaction: t },
          );
        }
        await TicketType.update(
          { leftCnt: 2 },
          { where: { id: ticketId }, transaction: t },
        );
      } else {
        throw new Error('transaction fail');
      }
    })
    .then(result => {
      console.log(result);
      res.send();
    })
    .catch(err => {
      console.log(err);
      res.status(204).send();
    });
};
