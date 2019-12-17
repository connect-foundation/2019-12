import { BoughtTicketEvent, CreatedEvent } from 'types/Data';
import { internalActions, FETCH_EVENTS, FETCH_CREATED_EVENTS } from './actions';
import { MyPageState } from 'types/States';
import { MyPageAction } from 'types/Actions';

export interface Reducer {
  (state: MyPageState, action: MyPageAction): MyPageState;
}

export const defaultState = {
  events: new Map<number, BoughtTicketEvent>(),
  eventsOrder: [],
  createdEvents: new Map<number, CreatedEvent>(),
  createdEventsOrder: [],
};

export default function reducer(
  state: MyPageState,
  action: MyPageAction,
): MyPageState {
  const { type, value } = action;

  switch (type) {
    case FETCH_EVENTS:
    case FETCH_CREATED_EVENTS:
      return internalActions(state, value)[type];

    default:
      throw new Error(`unexpected action.type: ${type}`);
  }
}
