import React from 'react';
import * as S from './style';
import FormInput, {
  Props as FormInputProps,
} from 'components/molecules/FormInput';
import Btn, { Props as BtnProps } from 'components/atoms/Btn';

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
        <FormInput
          {...FormInputs.lastName}
          data-testid={'signupform-lastname'}
        />
        <FormInput
          {...FormInputs.firstName}
          data-testid={'signupform-firstname'}
        />
      </S.NameContainer>
      <FormInput
        {...FormInputs.phoneNumber}
        data-testid={'signupform-phonenumber'}
      />
      <S.BtnWrapper>
        <Btn {...Button} data-testid={'signupform-submit'} />
      </S.BtnWrapper>
    </S.SignUpFormContainer>
  );
}

export default SignUpForm;
