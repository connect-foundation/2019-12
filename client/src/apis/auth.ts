import { mainAxios } from 'libs/axios';

export const verifyToken = () => mainAxios.post('auth');

export const getUserInfo = (id: number) => mainAxios.post(`/users/${id}`);
