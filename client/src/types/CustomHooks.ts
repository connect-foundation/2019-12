import { ActionParams } from './Actions';

export interface UseStateReducer<T> {
  (state: T, action: ActionParams<T>): T;
}
