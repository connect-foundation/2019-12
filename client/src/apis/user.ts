import { mainAxios } from 'libs/axios';

export const createUser = (
  id: number,
  googleId: number,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: number,
) =>
  mainAxios.post('users', {
    id,
    googleId,
    email,
    firstName,
    lastName,
    phoneNumber,
  });
