import { User } from 'models';
import { WhereOptions } from 'sequelize';

// User가 로그인을 할 때 사용되는 Service
export default async (
  googleId: number,
  email: string,
): Promise<[User, boolean]> => {
  const where: WhereOptions = { googleId, email };
  return await User.findOrCreate({ where });
};
