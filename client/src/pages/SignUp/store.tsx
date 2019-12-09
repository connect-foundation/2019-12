import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  Dispatch,
} from 'react';
import { useHistory } from 'react-router-dom';
import { OK, BAD_REQUEST } from 'http-status';

import { useStateReducer } from 'hooks/base/useStateReduter';
import { ActionParams } from 'types/Actions';
import { SignUpFormState } from 'types/States';
import { UseStateReducer } from 'types/CustomHooks';
import { validatePhoneNumber, validateName } from 'utils/validateInput';
import { UserAccountState, UserAccountAction } from 'stores/accountStore';
import { createUser } from 'apis';

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

  useEffect(() => {
    (async function getToken() {
      if (submit) {
        // Userdata를 서버로 보냄.
        try {
          const updateUserRes = await createUser(
            userId,
            googleId,
            email,
            firstName,
            lastName,
            +phoneNumber,
          );
          if (updateUserRes.status === OK) {
            alert('회원가입이 완료되었습니다.');
            dispatcher({ type: 'submit', value: false });
            setLoginState(true);
            history.push('/');
          }
        } catch (err) {
          //400 관련 코드는 전부 err로 넘어옴. 이것을 catch로써 처리함.
          if (err.response.status === BAD_REQUEST) {
            alert('이미 가입되어있는 회원입니다.');
            dispatcher({ type: 'submit', value: false });
            history.push('/');
          }
        }
      }
    })();
  }, [
    email,
    firstName,
    googleId,
    history,
    lastName,
    phoneNumber,
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
