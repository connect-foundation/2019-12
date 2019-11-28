import React from 'react';
import * as S from './style';
import FormInput, { Props as FormInputProps } from '../../molecules/FormInput';
import Btn, { Props as BtnProps } from '../../atoms/Btn';

export interface Props {
  FormInputs: {
    email: FormInputProps;
    lastName: FormInputProps;
    firstName: FormInputProps;
    phoneNumber: FormInputProps;
  };
  Button: BtnProps;
}

function SignUpForm({ FormInputs, Button }: Props): React.ReactElement {
  return (
    <S.SignUpFormContainer>
      <FormInput {...FormInputs.email} />
      <S.NameContainer>
        <FormInput {...FormInputs.lastName} />
        <FormInput {...FormInputs.firstName} />
      </S.NameContainer>
      <FormInput {...FormInputs.phoneNumber} />
      <S.BtnWrapper>
        <Btn {...Button} />
      </S.BtnWrapper>
    </S.SignUpFormContainer>
  );
}

export default SignUpForm;
