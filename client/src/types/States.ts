import { Event } from '../types/Data';

export interface SignUpFormState {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneValidate: boolean;
  firstNameValidate: boolean;
  lastNameValidate: boolean;
  submit: boolean;
}

export interface EventDetailState {
  eventData: Event;
}

export interface AccountState {
  // Account 상태가 False일 경우, 모든 항목이 null임, 만약 true일 경우 모든 항목이 다 있어야함.
  // 만약 회원가입을 하지 않아서 값이 넘어오질 않으면, 이 State를 업데이트하지 않음.
  isLogin: boolean;
  userId: number;
  googleId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
}

export interface EventsState {
  events: Map<number, Event>; // TODO: plz help me
  order?: number[];
  seletedEventId?: number;
}
