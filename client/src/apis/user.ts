import { mainAxios } from 'libs/axios';

export const createUser = (
  id: number,
  googleId: number,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) =>
  mainAxios.post('/users', {
    id,
    googleId,
    email,
    firstName,
    lastName,
    phoneNumber,
  });
