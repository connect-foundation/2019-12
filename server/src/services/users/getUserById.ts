import { User } from 'models';
import { WhereOptions } from 'sequelize';

export default async (id: number): Promise<User | null> => {
  const where: WhereOptions = { id };
  return await User.findOne({ where });
};
