import { AccountState, EventsState } from './States';

export interface ActionParams<T> {
  type: keyof T;
  value: T[keyof T];
}
export interface AccountAction {
  type: string;
  value?: AccountState;
}

export interface EventsAction {
  type: string;
  value: EventsState;
}
