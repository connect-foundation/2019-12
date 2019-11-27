import React, { useState, useEffect, createContext, useReducer } from 'react';
import {
  validatePhoneNumber,
  validateName,
} from '../../utils/ValidateSignUpForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initSignUpValue = {
  email: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
};
interface State {
  email: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  phoneValidate: boolean;
  firstNameValidate: boolean;
  lastNameValidate: boolean;
  submit: boolean;
}

export const SignUpState = createContext<State>({
  email: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
  phoneValidate: false,
  firstNameValidate: false,
  lastNameValidate: false,
  submit: false,
});
export const SignUpAction = createContext<any>(undefined);

function StoreProvider({ children }: { children: React.ReactElement }) {
  const history = useHistory();

  const [email, setEmail] = useState<string>(initSignUpValue.email);
  const [lastName, setLastName] = useState<string>(initSignUpValue.lastName);
  const [firstName, setFirstName] = useState<string>(initSignUpValue.firstName);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initSignUpValue.phoneNumber,
  );
  const [phoneValidate, setPhoneValidate] = useState<boolean>(false);
  const [firstNameValidate, setFirstNameValidate] = useState<boolean>(false);
  const [lastNameValidate, setLastNameValidate] = useState<boolean>(false);

  const [submit, setSubmit] = useState<boolean>(false);

  useEffect(() => {
    console.log(lastName, firstName, phoneNumber);
  }, [lastName, firstName, phoneNumber]);

  // Validation Features
  useEffect(() => {
    setPhoneValidate(!validatePhoneNumber(phoneNumber));
  }, [phoneNumber]);
  useEffect(() => {
    setFirstNameValidate(!validateName(firstName));
  }, [firstName]);
  useEffect(() => {
    setLastNameValidate(!validateName(lastName));
  }, [lastName]);

  // Axios
  useEffect(() => {
    (async function getToken() {
      if (submit) {
        // Submit 하기 이전 Token에서 Email을 뽑아옴.
        const getTokenRes = await axios('http://localhost:13000/api/auth', {
          method: 'post',
          withCredentials: true,
        });
        setSubmit(false);
        // Userdata를 서버로 보냄.
        const userData = Object.assign(
          { ...getTokenRes.data },
          {
            firstName,
            lastName,
            phoneNumber,
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
  }, [firstName, history, lastName, phoneNumber, submit]);

  return (
    <SignUpAction.Provider
      value={{
        setEmail,
        setLastName,
        setFirstName,
        setPhoneNumber,
        setPhoneValidate,
        setSubmit,
      }}
    >
      <SignUpState.Provider
        value={{
          email,
          lastName,
          firstName,
          phoneNumber,
          phoneValidate,
          firstNameValidate,
          lastNameValidate,
          submit,
        }}
      >
        {children}
      </SignUpState.Provider>
    </SignUpAction.Provider>
  );
}

export default StoreProvider;
