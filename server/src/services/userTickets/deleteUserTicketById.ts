import { TicketType, UserTicket } from 'models';
import { WhereOptions, Transaction, literal } from 'sequelize';
import { sequelize } from 'utils/sequelize';
import { redisNonBlockKey } from 'utils/redis';

export default async (id: number, userId: number): Promise<void> => {
  return await sequelize.transaction(async (transaction: Transaction) => {
    const where: WhereOptions = { id, userId };
    const userTicketData = await UserTicket.findOne({ where });
    if (!userTicketData) throw 'no ticket exist';
    const ticketTypeId = userTicketData.ticketTypeId;
    const ticketTypeData = await TicketType.findOne({
      where: { id: ticketTypeId },
    });

    if (!ticketTypeData) throw 'no ticket exist';
    if (ticketTypeData?.refundEndAt.getTime() < Date.now())
      throw 'cannot refund ticket';

    await userTicketData.destroy({ transaction });

    const updateTicketTypeResult = ticketTypeData.update(
      { leftCnt: literal('left_cnt + 1') },
      { where: { id: ticketTypeId } },
    );
    if (!updateTicketTypeResult) throw new Error('internal error');

    await redisNonBlockKey(ticketTypeId);
  });
};
