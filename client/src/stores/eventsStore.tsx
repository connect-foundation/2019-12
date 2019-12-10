import React, {
  createContext,
  useReducer,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from 'react';
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';
import { EventDetail } from 'types/Data';
import { EventsAction } from 'types/Actions';
import { EventsState } from 'types/States';
import { EventsReducer } from 'types/CustomHooks';
import { eventsReducer, defaultEventsState } from 'hooks';
import { getEvents, getEvent } from 'apis';

interface EventFetch {
  type: string;
  params: {
    cnt?: number;
    startAt?: string;
    eventId?: number;
  };
}

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
const fetchEvents = async (cnt: number, startAt: string) => {
  try {
    const { data } = await getEvents(cnt, startAt);
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
const fetchEvent = async (eventId: number) => {
  try {
    const { data } = await getEvent(eventId);
    const events = new Map([[data.id, data]]);
    return { ...defaultEventsState, type: 'EVENT', events, status: OK };
  } catch (err) {
    return handleFetchError(err);
  }
};

export const EventsStoreState = createContext<EventsState>(defaultEventsState);
export const EventsStoreAction = createContext<{
  eventsDispather: Dispatch<EventsAction>;
  eventFetchDispatcher: Dispatch<SetStateAction<EventFetch>>;
}>({
  eventsDispather: () => {},
  eventFetchDispatcher: () => {},
});

function EventsProvider({ children }: { children: React.ReactElement }) {
  const [eventsState, eventsDispather] = useReducer<EventsReducer>(
    eventsReducer,
    defaultEventsState,
  );

  const [eventFetch, eventFetchDispatcher] = useState<EventFetch>({
    type: 'EVENTS',
    params: {
      cnt: 12,
      startAt: '',
    },
  });

  useEffect(() => {
    switch (eventFetch.type) {
      case 'EVENTS':
        (async () => {
          const { cnt, startAt } = eventFetch.params;
          const { type, events, order, status } = await fetchEvents(
            cnt!,
            startAt!,
          );
          eventsDispather({
            type,
            value: {
              events,
              order,
              status,
            },
          });
        })();
        break;
      case 'EVENT':
        (async function fetchData() {
          const { eventId } = eventFetch.params;
          const { type, events, status } = await fetchEvent(eventId!);
          eventsDispather({
            type,
            value: {
              events,
              status,
            },
          });
        })();
        break;
    }
  }, [eventFetch]);

  return (
    <EventsStoreState.Provider value={eventsState}>
      <EventsStoreAction.Provider
        value={{ eventsDispather, eventFetchDispatcher }}
      >
        {children}
      </EventsStoreAction.Provider>
    </EventsStoreState.Provider>
  );
}

export default EventsProvider;
