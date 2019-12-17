import { User } from 'models';
import { WhereOptions } from 'sequelize';

export default async (googleId: number): Promise<User | null> => {
  const where: WhereOptions = { googleId: +googleId };
  return await User.findOne({ where });
};
