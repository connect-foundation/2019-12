import { ActionParams } from './Actions';
import { AccountState } from './States';
import { AccountAction } from './Actions';

export interface UseStateReducer<T> {
  (state: T, action: ActionParams<T>): T;
}
export interface AccountReducer {
  (state: AccountState, action: AccountAction): AccountState;
}
