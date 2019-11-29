import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import Input from '.';

export default {
  title: 'Atoms / Input',
};

export const defaultInput: React.FC = () => {
  return (
    <Input
      inputName={'email'}
      invalid={boolean('invalid', false)}
      disabled={boolean('disabled', false)}
      placeholder={text('placeholder', '이메일을 입력해주세요.')}
    />
  );
};

export const invalidInput: React.FC = () => (
  <Input
    inputName={'email'}
    invalid={boolean('invalid', true)}
    disabled={boolean('disabled', false)}
    defaultValue={text('defaultValue', 'bookusgmail.com')}
    placeholder={text('placeholder', '이메일을 입력해주세요.')}
  />
);

export const disabledInput: React.FC = () => (
  <Input
    inputName="email"
    invalid={boolean('invalid', false)}
    disabled={boolean('disabled', true)}
    defaultValue={text('defaultValue', 'bookus@gmail.com')}
  />
);
