import React from 'react';

import * as S from './style';
import Logo from '../../../components/atoms/Logo';
import SignUpFormContainer from 'components/organisms/SignUpForm';

const SignUpTemplate: React.FC = () => (
  <S.Wrapper>
    <S.Container>
      <Logo />
      <SignUpFormContainer />
    </S.Container>
  </S.Wrapper>
);

export default SignUpTemplate;
