import React from 'react';

import SignUpForm from '.';
import { text } from '@storybook/addon-knobs';

import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PHONE_NUMBER,
  SIGNUP_PASSSWORD,
} from '../../../commons/constants/string';

export default {
  title: 'Organisms / SignUpForm',
};
const FormInputs = {
  email: {
    inputName: 'email',
    captionContent: '이메일을 입력하세요',
    value: text('이메일', ''),
    labelProps: {
      name: SIGNUP_EMAIL,
      required: true,
    },
  },
  firstName: {
    inputName: 'firstName',
    captionContent: '성을 입력하세요',
    value: text('성', ''),
    labelProps: {
      name: SIGNUP_FIRST_NAME,
      required: true,
    },
  },
  lastName: {
    inputName: 'lastName',
    captionContent: '이름을 입력하세요',
    value: text('이름', ''),
    labelProps: {
      name: SIGNUP_LAST_NAME,
      required: true,
    },
  },
  phoneNumber: {
    inputName: 'phoneNumber',
    captionContent: '올바른 휴대폰 번호가 아닙니다.',
    value: text('휴대폰번호', ''),
    labelProps: {
      name: SIGNUP_PHONE_NUMBER,
      required: true,
    },
  },
  password: {
    inputName: 'password',
    captionContent:
      '비밀번호는 대소문자, 특수문자, 숫자를 포함한 8글자 이상이어야 합니다.',
    value: text('비밀번호', ''),
    labelProps: {
      name: SIGNUP_PASSSWORD,
      required: true,
    },
  },
};

const Button = {
  content: text('컨텐츠', ''),
  styletype: 'primary',
  grow: true,
};

export const defaultInput: React.FC = () => {
  return (
    <>
      <h1 style={{ marginBottom: '4rem' }}>
        *state를 주입해야 하는 컴포넌트이기 때문에 아래의 Knob로 인풋 변경 가능
      </h1>
      <SignUpForm FormInputs={FormInputs} Button={Button} />
    </>
  );
};
