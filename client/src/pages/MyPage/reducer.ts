import { BoughtTicketEvent, CreatedEvent } from 'types/Data';

interface State {
  events: Map<number, BoughtTicketEvent>;
  eventsOrder: number[];
  createdEvents: Map<number, CreatedEvent>;
  createdEventsOrder: number[];
}

interface Action {
  type: string;
  value: State;
}

export interface Reducer {
  (state: State, action: Action): State;
}

export const defaultState = {
  events: new Map<number, BoughtTicketEvent>(),
  eventsOrder: [],
  createdEvents: new Map<number, BoughtTicketEvent>(),
  createdEventsOrder: [],
};

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_CREATED_EVENTS = 'FETCH_CREATED_EVENTS';
export const FETCH_ERROR = 'FETCH_ERROR';

export default function reducer(state: State, action: Action) {
  const { type, value } = action;

  switch (type) {
    case FETCH_EVENTS:
      return Object.create({
        events: value.events,
        eventsOrder: value.eventsOrder,
        createdEvents: state.createdEvents,
        createdEventsOrder: state.createdEventsOrder,
      });

    case FETCH_CREATED_EVENTS:
      return Object.create({
        events: state.events,
        eventsOrder: state.eventsOrder,
        createdEvents: value.createdEvents,
        createdEventsOrder: value.createdEventsOrder,
      });

    default:
      throw new Error(`unexpected action.type: ${type}`);
  }
}
