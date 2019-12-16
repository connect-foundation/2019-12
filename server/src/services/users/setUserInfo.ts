import { User } from 'models';
import { WhereOptions } from 'sequelize';

// User가 회원가입을 할 때 사용되는 Service
export default async (
  id: number,
  googleId: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
): Promise<[number, User[]]> => {
  const values = {
    firstName,
    lastName,
    phoneNumber,
  };
  const where: WhereOptions = { id, googleId };
  return await User.update(values, { where });
};
