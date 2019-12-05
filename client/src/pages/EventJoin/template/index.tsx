import React from 'react';

import * as S from './style';
import BasedTemplate from '../../BasedTemplate/templates';

interface Props {
  TicketHeader: React.ReactNode;
  TicketBox: React.ReactNode;
  Counter: React.ReactNode;
  SubmitBtn: React.ReactNode;
}

function SignUpTemplate({
  TicketHeader,
  TicketBox,
  Counter,
  SubmitBtn,
}: Props): React.ReactElement {
  return (
    <BasedTemplate>
      <S.TicketContainer>
        <S.HeaderWrapper>{TicketHeader}</S.HeaderWrapper>
        <S.TicketWrapper>{TicketBox}</S.TicketWrapper>
        <S.CouterWrapper>{Counter}</S.CouterWrapper>
        {SubmitBtn}
      </S.TicketContainer>
      <S.EventContainer></S.EventContainer>
    </BasedTemplate>
  );
}

export default SignUpTemplate;
