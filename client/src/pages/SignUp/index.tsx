import React, { useState, useEffect } from 'react';
import SignUpTemplate from './template';
import SignUpForm from '../../components/organisms/SignUpForm';
import Btn from '../../components/atoms/Btn';

import axios from 'axios';

import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PHONE_NUMBER,
  SIGNUP_BTN,
} from '../../commons/constants/string';

const initSignUpValue = {
  email: '',
  lastName: '',
  firstName: '',
  phoneNumber: '',
};

function SignUpPage(): React.ReactElement {
  const [email, setEmail] = useState(initSignUpValue.email);
  const [lastName, setLastName] = useState(initSignUpValue.lastName);
  const [firstName, setFirstName] = useState(initSignUpValue.firstName);
  const [phoneNumber, setPhoneNumber] = useState(initSignUpValue.phoneNumber);

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    console.log(email, lastName, firstName, phoneNumber);
  }, [email, lastName, firstName, phoneNumber]);

  const instanceWithCredential = axios.create({
    baseURL: 'http://localhost:13000/',
    timeout: 180000,
    withCredentials: true,
  });

  useEffect(() => {
    (async function getToken() {
      const response = await axios('http://localhost:13000/api/auth', {
        method: 'post',
        withCredentials: true,
      });
      console.log(response);
      setSubmit(false);
    })();
  }, [submit]);

  const FormInputs = {
    email: {
      inputName: 'email',
      captionContent: '이메일을 입력하세요',
      disabled: true,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      },
      labelProps: {
        name: SIGNUP_EMAIL,
        required: false,
      },
    },
    firstName: {
      inputName: 'firstName',
      captionContent: '성을 입력하세요',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
      },
      labelProps: {
        name: SIGNUP_FIRST_NAME,
        required: true,
      },
    },
    lastName: {
      inputName: 'lastName',
      captionContent: '이름을 입력하세요',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
      },
      labelProps: {
        name: SIGNUP_LAST_NAME,
        required: true,
      },
    },
    phoneNumber: {
      inputName: 'phoneNumber',
      captionContent: '올바른 휴대폰 번호가 아닙니다.',
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
      },
      labelProps: {
        name: SIGNUP_PHONE_NUMBER,
        required: true,
      },
    },
  };

  const Button = {
    content: SIGNUP_BTN,
    styletype: 'primary',
    grow: true,
    onClick: () => {
      setSubmit(true);
    },
  };

  return (
    <SignUpTemplate
      header={<Btn content={'대충 로고'} to="/" />}
      content={<SignUpForm FormInputs={FormInputs} Button={Button} />}
    />
  );
}

export default SignUpPage;
