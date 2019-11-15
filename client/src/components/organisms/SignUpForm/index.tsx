import React from 'react';

import * as S from './style';
import SignUpFormItem from '../../molecules/FormItem';

const SignUpForm: React.FC = () => (
  <S.Container>
    <S.RowContainer>
      <SignUpFormItem name={'이메일'} required />
    </S.RowContainer>
    <S.RowColContainer>
      <SignUpFormItem name={'성'} required />
      <SignUpFormItem name={'이름'} required />
    </S.RowColContainer>
    <S.RowContainer>
      <SignUpFormItem name={'휴대폰 번호'} required={false} />
    </S.RowContainer>
    <S.SignUpBtn content={'회원가입'} />
  </S.Container>
);

export default SignUpForm;
