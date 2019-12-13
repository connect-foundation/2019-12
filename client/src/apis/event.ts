import { mainAxios, reserveAxios } from 'libs/axios';

export const getEvents = (cnt: number, startAt: string) => () => {
  const params = Object.assign(
    { cnt },
    startAt.length !== 0 ? { startAt } : {},
  );

  return mainAxios.get('/events', {
    params,
    headers: { Accept: 'application/json' },
  });
};

export const getEvent = (eventId: number) => () =>
  mainAxios.get(`/events/${eventId}`, {
    headers: { Accept: 'application/json' },
  });

export const joinEvent = (ticketId: number, orderTicketNum: number) => () =>
  reserveAxios.post(
    '/users/ticket',
    { ticketId, orderTicketNum },
    { headers: { Accept: 'application/json' } },
  );
