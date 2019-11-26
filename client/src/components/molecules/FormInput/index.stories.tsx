import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import FormInput from '.';

export default {
  title: 'Molecules / FormInput',
};

export const defaultInput: React.FC = () => {
  return (
    <FormInput
      labelProps={{
        name: text('labelName', '이메일'),
        required: boolean('required', false),
      }}
      inputName="email"
      invalid={boolean('invalid', false)}
      disabled={boolean('disabled', false)}
      captionContent={text('placeholder', '이메일을 입력해주세요.')}
    />
  );
};

export const requiredInput: React.FC = () => {
  return (
    <FormInput
      labelProps={{
        name: text('labelName', '이메일'),
        required: boolean('required', true),
      }}
      inputName="email"
      invalid={boolean('invalid', false)}
      disabled={boolean('disabled', false)}
      captionContent={text('placeholder', '이메일을 입력해주세요.')}
    />
  );
};

export const invalidInput: React.FC = () => {
  return (
    <FormInput
      labelProps={{
        name: text('labelName', '이메일'),
        required: boolean('required', true),
      }}
      inputName="email"
      invalid={boolean('invalid', true)}
      disabled={boolean('disabled', false)}
      captionContent={text('placeholder', '정확한 이메일을 입력해주세요.')}
    />
  );
};

export const disabledInput: React.FC = () => {
  return (
    <FormInput
      labelProps={{
        name: text('labelName', '이메일'),
        required: boolean('required', false),
      }}
      inputName="email"
      invalid={boolean('invalid', false)}
      disabled={boolean('disabled', true)}
      captionContent={text('placeholder', '이메일을 입력해주세요.')}
    />
  );
};
