import React, { useContext } from 'react';
import SignUpTemplate from './template';
import SignUpForm from '../../components/organisms/SignUpForm';
import Btn from '../../components/atoms/Btn';

import { SignUpAction, SignUpState } from './store';
import { UserAccountState } from '../../stores/accountStore';

import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PHONE_NUMBER,
  SIGNUP_BTN,
} from '../../commons/constants/string';

function SignUpView(): React.ReactElement {
  const { email } = useContext(UserAccountState);
  const dispatcher = useContext(SignUpAction);
  const { firstNameValidate, lastNameValidate, phoneValidate } = useContext(
    SignUpState,
  );

  const FormInputs = {
    email: {
      inputName: 'email',
      captionContent: '이메일을 입력하세요',
      disabled: true,
      value: email || '',
      labelProps: {
        name: SIGNUP_EMAIL,
        required: false,
      },
    },
    firstName: {
      inputName: 'firstName',
      captionContent: '성을 입력하세요',
      invalid: firstNameValidate,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatcher({ type: 'firstName', value });
      },
      labelProps: {
        name: SIGNUP_FIRST_NAME,
        required: true,
      },
    },
    lastName: {
      inputName: 'lastName',
      captionContent: '이름을 입력하세요',
      invalid: lastNameValidate,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatcher({ type: 'lastName', value });
      },
      labelProps: {
        name: SIGNUP_LAST_NAME,
        required: true,
      },
    },
    phoneNumber: {
      inputName: 'phoneNumber',
      captionContent: '올바른 휴대폰 번호가 아닙니다.',
      placeholder: '- 없이 숫자만 입력해주세요.',
      invalid: phoneValidate,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatcher({ type: 'phoneNumber', value });
      },
      labelProps: {
        name: SIGNUP_PHONE_NUMBER,
        required: true,
      },
    },
  };

  const Button = {
    children: SIGNUP_BTN,
    styletype: 'primary',
    grow: true,
    onClick: () => {
      dispatcher({ type: 'submit', value: true });
    },
  };

  return (
    <SignUpTemplate
      header={<Btn children={'대충 로고'} to="/" />}
      content={<SignUpForm FormInputs={FormInputs} Button={Button} />}
    />
  );
}

export default SignUpView;
