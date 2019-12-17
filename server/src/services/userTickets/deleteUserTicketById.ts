import { TicketType, UserTicket } from 'models';
import { WhereOptions, Transaction, literal } from 'sequelize';
import { sequelize } from 'utils/sequelize';
import { redisNonBlockKey } from 'utils/redis';

export default async (id: number, userId: number): Promise<void> => {
  return await sequelize.transaction(async (transaction: Transaction) => {
    const where: WhereOptions = { id, userId };
    const userTicketData = await UserTicket.findOne({ where });
    if (!userTicketData) throw new Error('no ticket exist');

    await userTicketData.destroy({ transaction });

    const ticketTypeId = userTicketData.ticketTypeId;
    const updateTicketTypeResult = await TicketType.update(
      { leftCnt: literal('left_cnt + 1') },
      { where: { id: ticketTypeId } },
    );
    if (updateTicketTypeResult[0] === 0) throw new Error('internal error');

    await redisNonBlockKey(ticketTypeId);
  });
};
