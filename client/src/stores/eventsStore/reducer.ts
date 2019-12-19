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

export default function eventsReducer(
  state: EventsState,
  action: EventsAction,
): {
  events?: Map<number, EventDetail>;
  order?: number[];
  status: number;
} {
  switch (action.type) {
    case 'EVENTS':
      return {
        events: produceMap(state.events!, action.value.events!),
        order: [...state.order!, ...action.value.order!],
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
