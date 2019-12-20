import produce from 'immer';

import { EventDetail } from 'types/Data';
import { EventsState } from 'types/States';
import { EventsAction } from 'types/Actions';

export const defaultEventsState: EventsState = {
  events: new Map<number, EventDetail>(),
  order: [],
  status: 0,
};

const produceMap = (
  sourceMap: Map<number, EventDetail>,
  targetMap: Map<number, EventDetail>,
): Map<number, EventDetail> =>
  produce(sourceMap, draft => {
    targetMap.forEach(value => {
      draft.set(value.id, value);
    });
  });
const produceUniqueOrder = (
  sourceMap: Map<number, EventDetail>,
  sourceOrder: number[],
  targetOrder: number[],
): number[] =>
  targetOrder.reduce((order, eventId) => {
    if (sourceMap.has(eventId)) return order;
    return [...order, eventId];
  }, sourceOrder);

export default function eventsReducer(
  state: EventsState,
  action: EventsAction,
): EventsState {
  switch (action.type) {
    case 'EVENTS':
      if (
        !state.events ||
        !action.value.events ||
        !state.order ||
        !action.value.order
      )
        return state;
      console.log('EVENTS');
      console.log(state.order);
      console.log(
        produceUniqueOrder(state.events, state.order, action.value.order),
      );
      return {
        events: produceMap(state.events, action.value.events),
        order: produceUniqueOrder(
          state.events,
          state.order,
          action.value.order,
        ),
        status: action.value.status,
      };
    case 'CREATE_EVENT':
      if (
        !state.events ||
        !action.value.events ||
        !state.order ||
        !action.value.order
      )
        return state;
      return {
        events: produceMap(state.events, action.value.events),
        order: [...action.value.order, ...state.order],
        status: action.value.status,
      };
    case 'ERROR':
      return {
        ...state,
        status: action.value.status,
      };
    default:
      throw new Error(`unexpected action.type: ${action.type}`);
  }
}
