import React from 'react';
import * as S from './style';
import FormInput from '../../molecules/FormInput';
import Btn from '../../atoms/Btn';
import {
  SIGNUP_EMAIL,
  SIGNUP_FIRST_NAME,
  SIGNUP_LAST_NAME,
  SIGNUP_PHONE_NUMBER,
  SIGNUP_PASSSWORD,
  SIGNUP_BTN,
} from '../../../commons/constants/string';

interface Props {
  state: {
    email: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
    password: string;
  };
  setState: (e: any) => void;
}

function SignUpForm({ state, setState }: Props): React.ReactElement {
  return (
    <S.SignUpFormContainer>
      <FormInput
        labelName={SIGNUP_EMAIL}
        captionContent="이메일을 입력하세요"
        required
        disabled
        inputName="email"
        value={state.email}
        onChange={setState}
      />
      <S.NameContainer>
        <FormInput
          labelName={SIGNUP_LAST_NAME}
          captionContent="성을 입력하세요"
          required
          inputName="lastName"
          value={state.lastName}
          onChange={setState}
        />
        <FormInput
          labelName={SIGNUP_FIRST_NAME}
          captionContent="이름을 입력하세요"
          required
          inputName="firstName"
          value={state.firstName}
          onChange={setState}
        />
      </S.NameContainer>
      <FormInput
        labelName={SIGNUP_PHONE_NUMBER}
        captionContent="올바른 휴대폰 번호가 아닙니다."
        inputName="phoneNumber"
        value={state.phoneNumber}
        onChange={setState}
      />
      <FormInput
        labelName={SIGNUP_PASSSWORD}
        captionContent="비밀번호는 대소문자, 특수문자, 숫자를 포함한 8글자 이상이어야 합니다."
        required
        inputName="password"
        value={state.password}
        onChange={setState}
      />
      <S.BtnWrapper>
        <Btn content={SIGNUP_BTN} styletype="primary" grow />
      </S.BtnWrapper>
    </S.SignUpFormContainer>
  );
}

export default SignUpForm;
