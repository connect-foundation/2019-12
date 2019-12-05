import { User } from '../models';
import { WhereOptions } from 'sequelize';

export async function getUserById(id: number): Promise<User | null> {
  const where: WhereOptions = { id };
  return await User.findOne({ where });
}
export async function getUserByGoogleId(
  googleId: number,
): Promise<User | null> {
  const where: WhereOptions = { googleId: +googleId };
  return await User.findOne({ where });
}

// User가 로그인을 할 때 사용되는 Service
export async function setUser(
  googleId: number,
  email: string,
): Promise<[User, boolean]> {
  const where: WhereOptions = { googleId, email };
  return await User.findOrCreate({ where });
}
// User가 회원가입을 할 때 사용되는 Service
export async function setUserInfo(
  id: number,
  googleId: number,
  firstName: string,
  lastName: string,
  phoneNumber: number,
): Promise<[number, User[]]> {
  const values = {
    firstName,
    lastName,
    phoneNumber,
  };
  const where: WhereOptions = { id, googleId };
  return await User.update(values, { where });
}
