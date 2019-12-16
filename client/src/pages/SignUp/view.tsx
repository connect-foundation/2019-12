import React, { useContext } from 'react';
import SignUpTemplate from './template';
import { SignUpForm, ImgBtn } from 'components';
import logo from 'assets/img/logo.svg';
import ROUTES from 'commons/constants/routes';
import { SignUpAction, SignUpState } from './store';
import { UserAccountState } from 'stores/accountStore';

import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PHONE_NUMBER,
  SIGNUP_BTN,
  SIGNUP_VALIDATION_EMAIL,
  SIGNUP_VALIDATION_FIRST_NAME,
  SIGNUP_VALIDATION_LAST_NAME,
  SIGNUP_VALIDATION_PHONE_NUMBER,
  SIGNUP_PLACEHOLDER_PHONE_NUMBER,
} from 'commons/constants/string';

function SignUpView(): React.ReactElement {
  const { email } = useContext(UserAccountState);
  const dispatcher = useContext(SignUpAction);
  const { firstNameValidate, lastNameValidate, phoneValidate } = useContext(
    SignUpState,
  );

  const FormInputs = {
    email: {
      inputName: 'email',
      captionContent: SIGNUP_VALIDATION_EMAIL,
      disabled: true,
      value: email || '',
      labelProps: {
        name: SIGNUP_EMAIL,
        required: false,
      },
    },
    firstName: {
      inputName: 'firstName',
      captionContent: SIGNUP_VALIDATION_FIRST_NAME,
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
      captionContent: SIGNUP_VALIDATION_LAST_NAME,
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
      captionContent: SIGNUP_VALIDATION_PHONE_NUMBER,
      placeholder: SIGNUP_PLACEHOLDER_PHONE_NUMBER,
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
      header={
        <ImgBtn
          to={ROUTES.HOME}
          alt={'Logo'}
          src={logo}
          data-testid={'signup-logo'}
        />
      }
      content={<SignUpForm FormInputs={FormInputs} Button={Button} />}
    />
  );
}

export default SignUpView;
