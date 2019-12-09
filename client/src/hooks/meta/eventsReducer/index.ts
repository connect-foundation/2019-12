import produce from 'immer';

import { EventDetail } from 'types/Data';
import { EventsState } from 'types/States';
import { EventsAction } from 'types/Actions';

export const defaultEventsState: EventsState = {
  events: new Map<number, EventDetail>(),
  order: [],
};

const produceMap = (
  sourceMap: Map<number, EventDetail>,
  targetMap: Map<number, EventDetail>,
) =>
  produce(sourceMap, draft => {
    targetMap.forEach(value => {
      draft.set(value.id, value);
    });
  });

export function eventsReducer(state: EventsState, action: EventsAction) {
  switch (action.type) {
    case 'EVENTS':
      return {
        ...state,
        events: produceMap(state.events, action.value.events),
        order: [...state.order!, ...action.value.order!],
      };
    case 'EVENT':
      return {
        ...state,
        events: produceMap(state.events, action.value.events),
      };
    default:
      throw new Error(`unexpected action.type: ${action.type}`);
  }
}
