import React from 'react';

import SignUpForm from '.';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Organisms / SignUpForm',
};

export const defaultInput: React.FC = () => {
  const state = {
    email: text('email', ''),
    lastName: text('lastName', ''),
    firstName: text('firstName', ''),
    phoneNumber: text('phoneNumber', ''),
    password: text('password', ''),
  };
  return (
    <>
      <h1 style={{ marginBottom: '4rem' }}>
        *state를 주입해야 하는 컴포넌트이기 때문에 아래의 Knob로 인풋 변경 가능
      </h1>
      <SignUpForm state={state} setState={() => {}} />
    </>
  );
};
