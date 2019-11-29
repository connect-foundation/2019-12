import React, { useEffect, createContext, useReducer, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { useStateReducer } from '../../hooks/base/useStateReduter';
import { ActionParams } from '../../types/Actions';
import { SignUpFormState } from '../../types/States';
import { UseStateReducer } from '../../types/CustomHooks';
import {
  validatePhoneNumber,
  validateName,
} from '../../utils/validateSignUpForms';

const defaultState: SignUpFormState = {
  email: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
  phoneValidate: false,
  firstNameValidate: false,
  lastNameValidate: false,
  submit: false,
};

export const SignUpState = createContext<SignUpFormState>(defaultState);
export const SignUpAction = createContext<
  Dispatch<ActionParams<SignUpFormState>>
>(() => {});

function StoreProvider({ children }: { children: React.ReactElement }) {
  const { REACT_APP_SERVER_URL: SERVER_URL } = process.env;
  const history = useHistory();
  const [states, dispatcher] = useReducer<UseStateReducer<SignUpFormState>>(
    useStateReducer,
    defaultState,
  );
  const { phoneNumber, firstName, lastName, submit } = states;

  // Validation Features
  useEffect(() => {
    dispatcher({
      type: 'phoneValidate',
      value: !validatePhoneNumber(phoneNumber),
    });
  }, [phoneNumber]);
  useEffect(() => {
    dispatcher({
      type: 'firstNameValidate',
      value: !validateName(firstName),
    });
  }, [firstName]);
  useEffect(() => {
    dispatcher({
      type: 'lastNameValidate',
      value: !validateName(lastName),
    });
  }, [lastName]);

  // Axios
  useEffect(() => {
    (async function getToken() {
      if (submit) {
        dispatcher({ type: 'submit', value: false });
        // Submit 하기 이전 Token에서 Email을 뽑아옴.
        const getTokenRes = await axios(`${SERVER_URL}/api/auth`, {
          method: 'post',
          withCredentials: true,
        });
        // Userdata를 서버로 보냄.
        const userData = Object.assign(
          { ...getTokenRes.data },
          {
            firstName,
            lastName,
            phoneNumber,
          },
        );
        try {
          const updateUserRes = await axios(`${SERVER_URL}/api/users`, {
            method: 'post',
            data: userData,
            withCredentials: true,
          });
          if (updateUserRes.status === 200) {
            alert('회원가입이 완료되었습니다.');
            history.push('/');
          }
        } catch (err) {
          //400 관련 코드는 전부 err로 넘어옴. 이것을 catch로써 처리함.
          if (err.response.status === 400) {
            alert('이미 가입되어있는 회원입니다.');
            history.push('/');
          }
        }
      }
    })();
  }, [SERVER_URL, firstName, history, lastName, phoneNumber, submit]);

  return (
    <SignUpAction.Provider value={dispatcher}>
      <SignUpState.Provider value={states}>{children}</SignUpState.Provider>
    </SignUpAction.Provider>
  );
}

export default StoreProvider;
