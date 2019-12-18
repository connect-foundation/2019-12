import { Dispatch } from 'react';
import { FetchProps } from 'hooks/useApiRequest';
import { BoughtTicketEvent, CreatedEvent } from 'types/Data';
import { MyPageAction } from 'types/Actions';
import { MyPageState } from 'types/States';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_CREATED_EVENTS = 'FETCH_CREATED_EVENTS';
export const DELETE_BOUGHT_TICKET = 'DELETE_BOUGHT_TICKET';

export interface UseAction {
  successFetchBoughtTicket: (
    boughtTicketResponse: FetchProps<BoughtTicketEvent[]>,
  ) => void;
  failureFetchBoughtTicket: (
    boughtTicketResponse: FetchProps<BoughtTicketEvent[]>,
  ) => void;
  successFetchCreatedEvents: (
    createdEventsResponse: FetchProps<CreatedEvent[]>,
  ) => void;
  failureFetchCreatedEvents: (
    createdEventsResponse: FetchProps<CreatedEvent[]>,
  ) => void;
  updateBoughtTickets: ({
    events,
    eventsOrder,
  }: Pick<MyPageState, 'events' | 'eventsOrder'>) => void;
}

export function internalActions(
  { events, eventsOrder, createdEvents, createdEventsOrder }: MyPageState,
  draftState: MyPageState,
) {
  return {
    [FETCH_EVENTS]: Object.assign(
      { events: draftState.events, eventsOrder: draftState.eventsOrder },
      {
        createdEvents,
        createdEventsOrder,
      },
    ),
    [FETCH_CREATED_EVENTS]: Object.assign(
      { events, eventsOrder },
      {
        createdEvents: draftState.createdEvents,
        createdEventsOrder: draftState.createdEventsOrder,
      },
    ),
  };
}

export default function useAction(dispatch: Dispatch<MyPageAction>) {
  return {
    successFetchBoughtTicket: (
      boughtTicketResponse: FetchProps<BoughtTicketEvent[]>,
    ) => {
      const { data } = boughtTicketResponse;

      if (data) {
        const events = new Map<number, BoughtTicketEvent>();
        const eventsOrder = data.map((event: BoughtTicketEvent) => {
          events.set(event.id, event);
          return event.id;
        });
        dispatch({
          type: FETCH_EVENTS,
          value: {
            events,
            eventsOrder,
          },
        });
      }
    },
    failureFetchBoughtTicket: (
      boughtTicketResponse: FetchProps<BoughtTicketEvent[]>,
    ) => {
      alert(`요청에 실패했습니다. ${boughtTicketResponse.status}`);
    },
    successFetchCreatedEvents: (
      createdEventsResponse: FetchProps<CreatedEvent[]>,
    ) => {
      const { data } = createdEventsResponse;

      if (data) {
        const createdEvents = new Map<number, CreatedEvent>();
        const createdEventsOrder = data.map((event: CreatedEvent) => {
          createdEvents.set(event.id, event);
          return event.id;
        });
        dispatch({
          type: FETCH_CREATED_EVENTS,
          value: {
            createdEvents,
            createdEventsOrder,
          },
        });
      }
    },
    failureFetchCreatedEvents: (
      createdEventsResponse: FetchProps<CreatedEvent[]>,
    ) => {
      alert(`요청에 실패했습니다. ${createdEventsResponse.status}`);
    },
    updateBoughtTickets: ({
      events,
      eventsOrder,
    }: Pick<MyPageState, 'events' | 'eventsOrder'>): void => {
      dispatch({
        type: FETCH_CREATED_EVENTS,
        value: {
          events,
          eventsOrder,
        },
      });
    },
  };
}
