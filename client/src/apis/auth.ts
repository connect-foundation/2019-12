import { mainAxios } from 'libs/axios';

export const verifyToken = () => mainAxios.post('auth');
