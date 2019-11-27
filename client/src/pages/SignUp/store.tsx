import React, { useEffect, createContext, useReducer, Dispatch } from 'react';
import {
  validatePhoneNumber,
  validateName,
} from '../../utils/ValidateSignUpForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { reducer, State, ActionParams } from './reducer';

const defaultState = {
  email: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
  phoneValidate: false,
  firstNameValidate: false,
  lastNameValidate: false,
  submit: false,
};

export const SignUpState = createContext<State>(defaultState);
export const SignUpAction = createContext<Dispatch<ActionParams>>(
  ({ type, value }: ActionParams) => {},
);

function StoreProvider({ children }: { children: React.ReactElement }) {
  const history = useHistory();
  const [States, Dispatcher] = useReducer(reducer, defaultState);

  useEffect(() => {
    console.log('States changed', States);
  }, [States]);

  // Validation Features
  useEffect(() => {
    Dispatcher({
      type: 'phoneValidate',
      value: !validatePhoneNumber(States.phoneNumber),
    });
  }, [States.phoneNumber]);
  useEffect(() => {
    Dispatcher({
      type: 'firstNameValidate',
      value: !validateName(States.firstName),
    });
  }, [States.firstName]);
  useEffect(() => {
    Dispatcher({
      type: 'lastNameValidate',
      value: !validateName(States.lastName),
    });
  }, [States.lastName]);

  // Axios
  useEffect(() => {
    (async function getToken() {
      if (States.submit) {
        // Submit 하기 이전 Token에서 Email을 뽑아옴.
        const getTokenRes = await axios('http://localhost:13000/api/auth', {
          method: 'post',
          withCredentials: true,
        });
        Dispatcher({ type: 'submit', value: false });
        // Userdata를 서버로 보냄.
        const userData = Object.assign(
          { ...getTokenRes.data },
          {
            firstName: States.firstName,
            lastName: States.lastName,
            phoneNumber: States.phoneNumber,
          },
        );
        const updateUserRes = await axios('http://localhost:13000/api/users', {
          method: 'post',
          data: userData,
          withCredentials: true,
        });
        if (updateUserRes.status === 200) {
          history.push('/');
        }
      }
    })();
  }, [
    States.firstName,
    history,
    States.lastName,
    States.phoneNumber,
    States.submit,
  ]);

  return (
    <SignUpAction.Provider value={Dispatcher}>
      <SignUpState.Provider value={States}>{children}</SignUpState.Provider>
    </SignUpAction.Provider>
  );
}

export default StoreProvider;
