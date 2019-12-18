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

export const getBoughtTicketEvent = () =>
  mainAxios.get('/users/tickets', {
    headers: { Accept: 'application/json' },
  });

export const getCreatedEvents = () =>
  mainAxios.get('/users/events', {
    headers: { Accept: 'application/json' },
  });

export const refundBoughtTicket = (ticketId: number) =>
  mainAxios.delete('/users/ticket', {
    data: { ticketId },
  });
