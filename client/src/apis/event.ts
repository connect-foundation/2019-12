import { mainAxios, reserveAxios } from 'libs/axios';

export const getEvents = async (cnt: number, startAt: string) => {
  const params = Object.assign(
    { cnt },
    startAt.length !== 0 ? { startAt } : {},
  );

  return mainAxios.get('/events', {
    params,
    headers: { Accept: 'application/json' },
  });
};

export const getEvent = async (eventId: number) =>
  mainAxios.get(`/events/${eventId}`, {
    headers: { Accept: 'application/json' },
  });

export const joinEvent = (ticketId: number, orderTicketNum: number) =>
  reserveAxios.post(
    '/users/ticket',
    { ticketId, orderTicketNum },
    { headers: { Accept: 'application/json' } },
  );
