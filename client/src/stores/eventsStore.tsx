import React, {
  createContext,
  useReducer,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from 'react';

import { EventsAction } from 'types/Actions';
import { EventsState } from 'types/States';
import { EventsReducer } from 'types/CustomHooks';
import { eventsReducer, defaultEventsState } from 'hooks';
import { getEvents, getEvent } from 'apis';

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
          const { type, events, order, status } = await getEvents(cnt, startAt);
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
          const { type, events, status } = await getEvent(eventId);
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
