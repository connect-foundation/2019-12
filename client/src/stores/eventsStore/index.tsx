import React, {
  createContext,
  useReducer,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from 'react';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';
import { EventDetail } from 'types/Data';
import { EventsAction } from 'types/Actions';
import { EventsState } from 'types/States';
import { EventsReducer } from 'types/CustomHooks';
import eventsReducer, { defaultEventsState } from './reducer';
import { getEvents } from 'apis';
import useApiRequest, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiRequest';

interface EventFetch {
  type: string;
  params: {
    cnt?: number;
    startAt?: string;
    eventId?: number;
  };
}
interface FetchState extends EventsState {
  type: string;
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

// const fetchEvent = async (eventId: number): Promise<FetchState> => {
//   try {
//     const { data } = await getEvent(eventId);
//     const events = new Map([[data.id, data]]);
//     return { ...defaultEventsState, type: 'EVENT', events, status: OK };
//   } catch (err) {
//     return handleFetchError(err);
//   }
// };

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
    type: 'EVENTS',
    params: {
      cnt: 12,
      startAt: '',
    },
  });

  const [fetchResult, fetchEvent] = useApiRequest<EventDetail[]>(getEvents);

  useEffect(() => {
    switch (eventFetch.type) {
      case 'EVENTS':
        fetchEvent({
          type: 'REQUEST',
          body: [eventFetch.params.cnt, eventFetch.params.startAt],
        });
        break;
    }
  }, [eventFetch, fetchEvent]);

  useEffect(() => {
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
            status: 200,
          },
        });
        break;
      case FAILURE:
        if (err && err.response && err.response.status === NOT_FOUND)
          eventsDispather({
            type: eventFetch.type,
            value: {
              status: NOT_FOUND,
            },
          });
        else if (err)
          eventsDispather({
            type: eventFetch.type,
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
