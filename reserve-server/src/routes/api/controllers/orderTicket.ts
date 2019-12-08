import { Response } from 'express';
import { sequelize } from '../../../utils/sequelize';
import { Transaction } from 'sequelize/types';
import { orderTransaction } from '../../../services';
import { FORBIDDEN, NOT_FOUND } from 'http-status';

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
    if (err.state === 404)
      return res.status(NOT_FOUND).send({ message: 'not exist' });
    return res.status(FORBIDDEN).send(err);
  }
};
