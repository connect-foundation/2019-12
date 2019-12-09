import React, {
  createContext,
  useReducer,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from 'react';
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';

import { EventsAction } from 'types/Actions';
import { EventsState } from 'types/States';
import { EventsReducer } from 'types/CustomHooks';
import { eventsReducer, defaultEventsState } from 'hooks';

import { getEvents, getEvent } from 'apis';
import { EventDetail } from 'types/Data';

interface EventFetch {
  type: string;
  params?: any;
}

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
          const { data } = await getEvents(cnt, startAt);
          const events = new Map<number, EventDetail>();
          const order = data.map((event: EventDetail) => {
            events.set(event.id, event);
            return event.id;
          });
          eventsDispather({
            type: 'EVENTS',
            value: { events, order, status: OK },
          });
        })();
        break;
      case 'EVENT':
        (async function fetchData() {
          const { eventId } = eventFetch.params;
          try {
            const { data } = await getEvent(eventId);
            const events = new Map([[data.id, data]]);
            eventsDispather({
              type: 'EVENT',
              value: { events, status: OK },
            });
          } catch (err) {
            if (err.response && err.response.status === NOT_FOUND) {
              eventsDispather({
                type: String(NOT_FOUND),
                value: {
                  status: NOT_FOUND,
                },
              });
            } else {
              eventsDispather({
                type: String(INTERNAL_SERVER_ERROR),
                value: {
                  status: INTERNAL_SERVER_ERROR,
                },
              });
            }
          }
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
