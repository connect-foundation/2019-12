import { EventDetail } from './Data';

export interface SignUpFormState {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneValidate: boolean;
  firstNameValidate: boolean;
  lastNameValidate: boolean;
  submit: boolean;
}
export interface EventCreateFormState {
  isPublic: boolean;
  eventTitle: string;
  eventDate: string;
  eventPlace: string;
  eventAddress: string;
  eventPlaceDesc: string;
  eventMainImg: string;
  eventDesc: string;
  ticketName: string;
  ticketDesc: string;
  ticketPrice: string;
  ticketQuantity: string;
  ticketIsPublicLeftCnt: boolean;
  ticketMaxCntPerPerson: string;
  ticketSalesDate: string;
  ticketRefundDate: string;
  formValid: boolean;
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
