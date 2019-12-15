import React from 'react';

import * as S from './style';

export interface Props {
  header: React.ReactNode;
  ticketBox: React.ReactNode;
  counter: React.ReactNode;
  submitBtn: React.ReactNode;
}

function TicketChoiceTemplate({
  header,
  ticketBox,
  counter,
  submitBtn,
}: Props): React.ReactElement {
  return (
    <S.Container>
      <S.HeaderWrapper>{header}</S.HeaderWrapper>
      <S.TicketWrapper>{ticketBox}</S.TicketWrapper>
      <S.CouterWrapper>{counter}</S.CouterWrapper>
      {submitBtn}
    </S.Container>
  );
}

export default TicketChoiceTemplate;
