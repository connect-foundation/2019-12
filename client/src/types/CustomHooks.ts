import { ActionParams } from './Actions';
import { EventsState } from './States';
import { EventsAction } from './Actions';

export interface UseStateReducer<T> {
  (state: T, action: ActionParams<T>): T;
}
export interface EventsReducer {
  (state: EventsState, action: EventsAction): EventsState;
}
