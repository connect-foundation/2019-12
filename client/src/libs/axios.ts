import axios from 'axios';

const { REACT_APP_SERVER_URL, REACT_APP_SERVER_RESERVE_URL } = process.env;

export const mainAxios = axios.create({
  baseURL: `${REACT_APP_SERVER_URL}/api`,
  withCredentials: true,
});

export const reserveAxios = axios.create({
  baseURL: `${REACT_APP_SERVER_RESERVE_URL}/api`,
  withCredentials: true,
});
