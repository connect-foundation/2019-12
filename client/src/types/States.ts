import { EventDetail } from '../types/Data';

export interface SignUpFormState {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneValidate: boolean;
  firstNameValidate: boolean;
  lastNameValidate: boolean;
  submit: boolean;
}

export interface EventDetailState {
  data: EventDetail | any;
}
