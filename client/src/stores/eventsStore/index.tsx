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
import eventsReducer, { defaultEventsState } from './reducer';
import { getEvents } from 'apis';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';
import {
  ACTION_CREATE_EVENT,
  ACTION_FETCH_EVENTS,
  ACTION_ERROR,
} from 'commons/constants/string';

interface EventFetch {
  type: string;
  data: {
    cnt?: number;
    startAt?: string;
    createdEvent?: EventDetail;
  };
}

const convertEvents = (
  unconvertedEvents: EventDetail[],
): {
  events: Map<number, EventDetail>;
  order: number[];
} => {
  const events = new Map<number, EventDetail>();
  const order = unconvertedEvents.map((event: EventDetail) => {
    events.set(event.id, event);
    return event.id;
  });
  return { events, order };
};
const convertCreatedEvent = (
  createdEvent: EventDetail,
): {
  events: Map<number, EventDetail>;
  order: number[];
} => {
  const events = new Map<number, EventDetail>();
  const order = [createdEvent.id];
  events.set(createdEvent.id, createdEvent);
  return { events, order };
};

export const EventsStoreState = createContext<EventsState>(defaultEventsState);
export const EventsStoreAction = createContext<{
  eventsDispather: Dispatch<EventsAction>;
  eventFetchDispatcher: Dispatch<SetStateAction<EventFetch>>;
}>({
  eventsDispather: () => {},
  eventFetchDispatcher: () => {},
});

function EventsProvider({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element {
  const [eventsState, eventsDispather] = useReducer<EventsReducer>(
    eventsReducer,
    defaultEventsState,
  );

  const [eventFetch, eventFetchDispatcher] = useState<EventFetch>({
    type: ACTION_FETCH_EVENTS,
    data: {
      cnt: 12,
      startAt: '',
    },
  });

  const [fetchResult, fetchEvent] = useApiRequest<EventDetail[]>(getEvents);

  useEffect(() => {
    switch (eventFetch.type) {
      case ACTION_FETCH_EVENTS:
        fetchEvent({
          type: REQUEST,
          body: [eventFetch.data.cnt, eventFetch.data.startAt],
        });
        break;
      case ACTION_CREATE_EVENT:
        if (!eventFetch.data.createdEvent) return;
        const { events, order } = convertCreatedEvent(
          eventFetch.data.createdEvent,
        );
        eventsDispather({
          type: eventFetch.type,
          value: {
            events,
            order,
            status: OK,
          },
        });
        break;
    }
  }, [eventFetch, fetchEvent]);

  useEffect(() => {
    if (eventFetch.type === ACTION_CREATE_EVENT) return;
    const { type, data, err } = fetchResult;
    switch (type) {
      case REQUEST:
        break;
      case SUCCESS:
        if (!data) return;
        const { events, order } = convertEvents(data);
        eventsDispather({
          type: eventFetch.type,
          value: {
            events,
            order,
            status: OK,
          },
        });
        break;
      case FAILURE:
        if (err && err.response && err.response.status === NOT_FOUND)
          eventsDispather({
            type: ACTION_ERROR,
            value: {
              status: NOT_FOUND,
            },
          });
        else if (err)
          eventsDispather({
            type: ACTION_ERROR,
            value: {
              status: INTERNAL_SERVER_ERROR,
            },
          });
    }
  }, [fetchResult, eventFetch.type]);

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
