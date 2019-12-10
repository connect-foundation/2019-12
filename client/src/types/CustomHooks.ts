import { ActionParams } from './Actions';
import { AccountState, EventsState } from './States';
import { AccountAction, EventsAction } from './Actions';

export interface UseStateReducer<T> {
  (state: T, action: ActionParams<T>): T;
}
export interface AccountReducer {
  (state: AccountState, action: AccountAction): AccountState;
}

export interface EventsReducer {
  (state: EventsState, action: EventsAction): EventsState;
}
