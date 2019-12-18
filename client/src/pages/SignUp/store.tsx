import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  Dispatch,
} from 'react';
import { useHistory } from 'react-router-dom';
import { BAD_REQUEST, FORBIDDEN, OK } from 'http-status';

import { ActionParams } from 'types/Actions';
import { SignUpFormState } from 'types/States';
import { UseStateReducer } from 'types/CustomHooks';
import { validatePhoneNumber, validateName } from 'utils/validateInput';
import { UserAccountState, UserAccountAction } from 'stores/accountStore';
import { createUser } from 'apis';

export function useStateReducer<T>(state: T, action: ActionParams<T>): T {
  const { type, value } = action;

  return {
    ...state,
    [type]: value,
  };
}

const defaultState: SignUpFormState = {
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
  const history = useHistory();
  const [states, dispatcher] = useReducer<UseStateReducer<SignUpFormState>>(
    useStateReducer,
    defaultState,
  );
  const { userId, googleId, email } = useContext(UserAccountState);
  const { setLoginState } = useContext(UserAccountAction);
  const {
    phoneNumber,
    firstName,
    lastName,
    submit,
    firstNameValidate,
    lastNameValidate,
    phoneValidate,
  } = states;

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

  useEffect(() => {
    (async function getToken() {
      if (!submit) return;
      if (
        firstNameValidate ||
        lastNameValidate ||
        phoneValidate ||
        !firstName ||
        !lastName ||
        !phoneNumber
      ) {
        alert('입력값을 확인해주세요');
        dispatcher({ type: 'submit', value: false });
        return;
      }
      try {
        const updateUserRes = await createUser(
          userId,
          googleId,
          email,
          firstName,
          lastName,
          phoneNumber,
        );
        if (updateUserRes.status === OK) {
          alert('회원가입이 완료되었습니다.');
          setLoginState(true);
          history.push('/');
        }
      } catch (err) {
        //400 관련 코드는 전부 err로 넘어옴. 이것을 catch로써 처리함.
        if (err.response.status === FORBIDDEN) {
          alert('잘못된 입력값입니다.');
          dispatcher({ type: 'submit', value: false });
        }
        if (err.response.status === BAD_REQUEST) {
          alert('이미 가입되어있는 회원입니다.');
          history.push('/');
        }
      }
    })();
  }, [
    email,
    firstName,
    firstNameValidate,
    googleId,
    history,
    lastName,
    lastNameValidate,
    phoneNumber,
    phoneValidate,
    setLoginState,
    submit,
    userId,
  ]);

  return (
    <SignUpAction.Provider value={dispatcher}>
      <SignUpState.Provider value={states}>{children}</SignUpState.Provider>
    </SignUpAction.Provider>
  );
}

export default StoreProvider;
