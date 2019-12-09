import { mainAxios, reserveAxios } from 'libs/axios';
import { EventDetail } from 'types/Data';
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';
import { defaultEventsState } from 'hooks/meta/eventsReducer';

const handleFetchError = (err: any) => {
  if (err.response && err.response.status === NOT_FOUND) {
    return { ...defaultEventsState, type: 'ERROR', status: NOT_FOUND };
  } else {
    return {
      ...defaultEventsState,
      type: 'ERROR',
      status: INTERNAL_SERVER_ERROR,
    };
  }
};

export const getEvents = async (cnt: number, startAt: string) => {
  const params = Object.assign(
    { cnt },
    startAt.length !== 0 ? { startAt } : {},
  );

  try {
    const { data } = await mainAxios.get('/events', {
      params,
      headers: { Accept: 'application/json' },
    });
    const events = new Map<number, EventDetail>();
    const order = data.map((event: EventDetail) => {
      events.set(event.id, event);
      return event.id;
    });
    return { type: 'EVENTS', events, order, status: OK };
  } catch (err) {
    return handleFetchError(err);
  }
};

export const getEvent = async (eventId: number) => {
  try {
    const { data } = await mainAxios.get(`/events/${eventId}`, {
      headers: { Accept: 'application/json' },
    });
    const events = new Map([[data.id, data]]);
    return { ...defaultEventsState, type: 'EVENT', events, status: OK };
  } catch (err) {
    return handleFetchError(err);
  }
};

export const joinEvent = (ticketId: number, orderTicketNum: number) =>
  reserveAxios.post(
    '/users/ticket',
    { ticketId, orderTicketNum },
    { headers: { Accept: 'application/json' } },
  );
