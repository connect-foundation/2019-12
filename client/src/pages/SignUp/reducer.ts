export interface State {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneValidate: boolean;
  firstNameValidate: boolean;
  lastNameValidate: boolean;
  submit: boolean;
}

export interface ActionParams {
  type: string;
  value: string | boolean;
}

export function reducer(state: State, action: ActionParams): State {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}
