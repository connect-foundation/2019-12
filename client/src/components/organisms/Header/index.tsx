import React from 'react';

import * as S from './style';
import Btn from '../../atoms/Btn';
import logo from '../../../assets/img/logo.svg';
import ROUTES from '../../../commons/constants/routes';

import { CREATE_EVENT } from '../../../commons/constants/string';

interface Props {
  userNameText: string;
  onCreateEventBtnClickHandlerick?: () => void;
  onAccountClickHandlerick?: () => void;
}

function Header({
  userNameText,
  onCreateEventBtnClickHandlerick = () => {},
  onAccountClickHandlerick = () => {},
}: Props): React.ReactElement {
  return (
    <S.Container>
      <Btn
        grow={false}
        fit={true}
        styletype={'transparent'}
        content={CREATE_EVENT}
        to={ROUTES.EVENT_CREATE}
        onClick={onCreateEventBtnClickHandlerick}
      />

      <S.StyledLink to={ROUTES.HOME}>
        <S.Img alt={'Logo'} src={logo} />
      </S.StyledLink>
      <Btn
        grow={false}
        fit={true}
        styletype={'transparent-border'}
        content={userNameText}
        to={ROUTES.LOGIN}
        onClick={onAccountClickHandlerick}
      />
    </S.Container>
  );
}

export default Header;
