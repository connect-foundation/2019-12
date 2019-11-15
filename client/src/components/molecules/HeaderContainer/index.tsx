import React from 'react';
import * as S from './style';

import LogoBtn from '../../atoms/LogoBtn';
import { BEFORE_LOGIN, CREATE_EVENT } from '../../../commons/constants/string';

const HeaderContainer: React.FC = () => (
  <S.Container>
    <S.CreateEventBtn content={CREATE_EVENT} />
    <LogoBtn />
    <S.AccountBtn content={BEFORE_LOGIN} />
  </S.Container>
);

export default HeaderContainer;
