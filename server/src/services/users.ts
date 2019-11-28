import { User } from '../models';

export async function getUserByGoogleId(
  googleId: number,
): Promise<User | null> {
  const where = { googleId: +googleId };
  return await User.findOne({ where });
}
// User가 로그인을 할 때 사용되는 Service
export async function setUser(
  googleId: number,
  email: string,
): Promise<User | null> {
  return await User.create({ googleId, email });
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
  const where = { id, googleId };
  return await User.update(values, { where });
}
