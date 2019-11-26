import { User } from '../models';

export async function getUserByGoogleId(
  googleId: number,
): Promise<User | null> {
  const where = { googleId: +googleId };
  return await User.findOne({ where });
}

export async function setUser(
  googleId: number,
  email: string,
): Promise<User | null> {
  return await User.create({ googleId, email });
}

export async function setUserInfo(
  id: number,
  googleId: number,
  firstname: string,
  lastname: string,
  phonenum: number,
): Promise<boolean> {
  const where = { id, googleId, firstname, lastname, phonenum };
  return await User.upsert({ where });
}
