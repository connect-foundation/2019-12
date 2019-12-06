import React from 'react';

import * as S from './style';
import TicketImg from 'assets/img/ticket.svg';
import IconLabel from 'components/molecules/IconLabel';
import Price from 'components/atoms/Price';
import { TicketType } from 'types/Data';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

function TicketBox({
  price,
  name,
  desc,
  salesStartAt,
  salesEndAt,
}: TicketType): React.ReactElement {
  const remainDays = calculateDiffDaysOfDateRange(salesStartAt, salesEndAt);
  console.log(remainDays, salesStartAt, salesEndAt);

  return (
    <S.Container>
      <S.Name>{name}</S.Name>
      <S.PriceWrapper>
        <Price mount={price} separated={true} />
      </S.PriceWrapper>
      <S.Desc>{desc}</S.Desc>
      <IconLabel
        iconProps={{
          height: '1.5rem',
          alt: 'ticket',
          src: TicketImg,
        }}
        labelContent={`${remainDays}일 후에 판매마감`}
      />
      <div></div>
    </S.Container>
  );
}

export default TicketBox;
