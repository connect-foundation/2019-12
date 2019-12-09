import React from 'react';

import * as S from './style';
import { Divider } from 'components';

export interface Props {
  header: React.ReactNode;
  ticket: React.ReactNode;
  totalPriceLabel: string;
  price: React.ReactNode;
  purchaseBtn: React.ReactNode;
}

function TicketPurchaseTemplate({
  header,
  ticket,
  totalPriceLabel,
  price,
  purchaseBtn,
}: Props): React.ReactElement {
  return (
    <S.Container>
      <S.HeaderWrapper>{header}</S.HeaderWrapper>
      {ticket}
      <S.TotalContainer>
        <S.Label>{totalPriceLabel}</S.Label>
        <S.TotalPriceWrapper>{price}</S.TotalPriceWrapper>
      </S.TotalContainer>
      <Divider />
      <S.PurchaseBtnWrapper>{purchaseBtn}</S.PurchaseBtnWrapper>
    </S.Container>
  );
}

export default TicketPurchaseTemplate;
