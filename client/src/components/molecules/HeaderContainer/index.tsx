import React from 'react';
import * as S from './style';

import CreateEventBtn from '../../atoms/CreateEventBtn';
import LogoBtn from '../../atoms/LogoBtn';
import AccountBtn from '../../atoms/AccountBtn';
import { BEFORE_LOGIN } from '../../../commons/constants/string';

const HeaderContainer: React.FC = () => (
  <S.Container>
    <CreateEventBtn />
    <LogoBtn />
    <AccountBtn content={BEFORE_LOGIN} />
  </S.Container>
);

export default HeaderContainer;
