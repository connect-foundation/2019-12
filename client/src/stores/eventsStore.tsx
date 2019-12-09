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
            value: { events, order },
          });
        })();
        break;
      case 'EVENT':
        (async () => {
          const { eventId } = eventFetch.params;
          const { data } = await getEvent(eventId);
          const events = new Map([[data.id, data]]);
          eventsDispather({
            type: 'EVENT',
            value: { events },
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
