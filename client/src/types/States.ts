import {
  EventDetail,
  BoughtTicketEvent,
  CreatedEvent,
  SearchMapResult,
} from './Data';

export interface SignUpFormState {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneValidate: boolean;
  firstNameValidate: boolean;
  lastNameValidate: boolean;
  submit: boolean;
}

interface FormState<T> {
  valid: boolean;
  value: T;
}
export interface EventFormState {
  isPublic: FormState<boolean>;
  title: FormState<string>;
  date: FormState<{
    startAt: string;
    endAt?: string;
  }>;
  place: FormState<string>;
  address: FormState<SearchMapResult>;
  placeDesc: FormState<string>;
  mainImg: FormState<File>;
  desc: FormState<string>;
}

export interface TicketFormState {
  name: FormState<string>;
  desc: FormState<string>;
  price: FormState<string>;
  quantity: FormState<string>;
  isPublicLeftCnt: FormState<boolean>;
  maxCntPerPerson: FormState<string>;
  salesDate: FormState<{
    salesStartAt: string;
    salesEndAt: string;
  }>;
  refundDate: FormState<{
    refundEndAt: string;
  }>;
}

export interface EventDetailState {
  eventData: EventDetail;
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
  events?: Map<number, EventDetail>;
  order?: number[];
  status: number;
}

export interface MyPageState {
  events?: Map<number, BoughtTicketEvent>;
  eventsOrder?: number[];
  createdEvents?: Map<number, CreatedEvent>;
  createdEventsOrder?: number[];
}
