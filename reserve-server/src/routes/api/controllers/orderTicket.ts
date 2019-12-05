import { Response } from 'express';
import { sequelize } from '../../../utils/sequelize';
import { Transaction } from 'sequelize/types';
import { orderTransaction } from '../../../services';

export default async (req: any, res: Response) => {
  const userId = req.user.id;
  const { ticketId, orderTicketNum } = req.body;
  try {
    await sequelize.transaction(
      async (t: Transaction) =>
        await orderTransaction(t, userId, ticketId, orderTicketNum),
    );
    res.send({ message: 'success' });
  } catch (err) {
    res.status(403).send({ message: 'failure' });
  }
};