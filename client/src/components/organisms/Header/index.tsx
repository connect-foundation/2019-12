import React from 'react';

import * as S from './style';
import Btn from '../../atoms/Btn';
import logo from '../../../assets/img/logo.svg';

interface Props {
  createEventText: string;
  userNameText: string;
  logoLinkTo: string;
  onCreateEventBtnClickHandlerick?: () => void;
  onUserPageBtnClickHandlerick?: () => void;
}

function Header({
  createEventText,
  userNameText,
  logoLinkTo,
  onCreateEventBtnClickHandlerick = () => {},
  onUserPageBtnClickHandlerick = () => {},
}: Props): React.ReactElement {
  return (
    <S.Container>
      <Btn
        grow={false}
        fitWidth={true}
        styleType={'transparent'}
        content={createEventText}
        href={''}
        to={''}
        onClick={onCreateEventBtnClickHandlerick}
      />

      <S.StyledLink to={logoLinkTo}>
        <S.Img alt={'Logo'} src={logo} />
      </S.StyledLink>
      <Btn
        grow={false}
        fitWidth={true}
        styleType={'transparent'}
        content={userNameText}
        href={''}
        to={''}
        onClick={onUserPageBtnClickHandlerick}
      />
    </S.Container>
  );
}

export default Header;
