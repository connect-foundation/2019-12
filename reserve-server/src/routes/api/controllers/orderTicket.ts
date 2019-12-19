import { Response } from 'express';
import { sequelize } from 'utils/sequelize';
import { Transaction } from 'sequelize/types';
import { orderTransaction } from 'services';
import { FORBIDDEN, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';
import { SUCCESS } from 'common/constants';

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
    if (err.status === 404) return res.status(NOT_FOUND).send(err);
    if (err.status === 403) return res.status(FORBIDDEN).send(err);
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
};
