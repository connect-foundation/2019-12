import { Response } from 'express';
import { sequelize } from '../../../utils/sequelize';
import { Transaction } from 'sequelize/types';
import { orderTransaction } from '../../../services';
import { FORBIDDEN, NOT_FOUND } from 'http-status';
import { SUCCESS } from '../../../constants';

export default async (req: any, res: Response) => {
  const userId = req.user.id;
  const { ticketId, orderTicketNum } = req.body;
  try {
    await sequelize.transaction(
      async (t: Transaction) =>
        await orderTransaction(t, userId, ticketId, orderTicketNum),
    );
    res.send(SUCCESS);
  } catch (err) {
    if (err.state === 404) return res.status(NOT_FOUND).send(err);
    return res.status(FORBIDDEN).send(err);
  }
};
