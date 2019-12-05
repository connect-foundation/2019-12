import produce from 'immer';

import { Event } from 'types/Data';
import { EventsState } from 'types/States';
import { EventsAction } from 'types/Actions';

export const defaultEventsState: EventsState = {
  events: new Map<number, Event>(),
  order: [],
  seletedEventId: -1,
};

const produceMap = (
  sourceMap: Map<number, Event>,
  targetMap: Map<number, Event>,
) =>
  produce(sourceMap, draft => {
    targetMap.forEach(value => {
      draft.set(value.id, value);
    });
  });

export function eventsReducer(state: EventsState, action: EventsAction) {
  switch (action.type) {
    case 'MAIN': {
      return {
        ...state,
        events: produceMap(state.events, action.value.events),
        order: [...state.order!, ...action.value.order!],
      };
    }
    case 'DETAIL': {
      return {
        ...state,
        events: produceMap(state.events, action.value.events),
        seletedEventId: action.value.seletedEventId,
      };
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
}
