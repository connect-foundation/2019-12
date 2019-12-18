import {
  ActionParams,
  MyPageAction,
  AccountAction,
  EventsAction,
} from './Actions';
import { AccountState, EventsState, MyPageState } from './States';

export interface UseStateReducer<T> {
  (state: T, action: ActionParams<T>): T;
}
export interface AccountReducer {
  (state: AccountState, action: AccountAction): AccountState;
}

export interface EventsReducer {
  (state: EventsState, action: EventsAction): EventsState;
}

export interface MyPageReducer {
  (state: MyPageState, action: MyPageAction): MyPageState;
}
