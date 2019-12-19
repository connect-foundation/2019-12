export const SOLD_OUT = {
  status: 403,
  state: 1,
  message: 'ticket sold out',
};
export const NOT_OPEN = {
  status: 403,
  state: 0,
  message: 'wrong date',
};
export const EXCEED_LIMIT = {
  status: 403,
  state: 2,
  message: 'limit exceed ticket per person',
};
export const SUCCESS = {
  status: 200,
  message: 'success',
};
export const UNAUTH = {
  status: 401,
  message: 'unauthorized',
};
export const NOT_EXIST = {
  status: 404,
  message: 'wrong number of ticket',
};
