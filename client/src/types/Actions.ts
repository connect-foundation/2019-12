import { AccountState, EventsState } from './States';
/**
 * type은 State 이름을 넣어서 사용한다.
 */
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
