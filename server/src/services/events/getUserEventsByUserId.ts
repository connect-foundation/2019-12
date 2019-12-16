import { Event } from 'models';
import { WhereOptions, Order, FindAttributeOptions } from 'sequelize';

export default async (userId: number): Promise<Event[]> => {
  const where: WhereOptions = { userId };
  const order: Order = [['startAt', 'DESC']];
  const attributes: FindAttributeOptions = {
    exclude: [
      'createdAt',
      'updatedAt',
      'desc',
      'latitude',
      'longitude',
      'isPublic',
    ],
  };
  return await Event.findAll({ where, order, attributes });
};
