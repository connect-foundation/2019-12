import React from 'react';

import * as S from './style';
import TicketImg from 'assets/img/ticket.svg';
import { IconLabel, Price } from 'components';
import ChkBox, { Props as ChkBoxProps } from 'components/atoms/ChkBox';
import { TicketType } from 'types/Data';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

interface Props extends TicketType {
  chkBoxProps: ChkBoxProps;
}

function TicketBox({
  price,
  name,
  desc,
  salesStartAt,
  salesEndAt,
  chkBoxProps,
}: Props): React.ReactElement {
  const remainDays = calculateDiffDaysOfDateRange(salesStartAt, salesEndAt);
  const { checked } = chkBoxProps;

  return (
    <S.Container>
      <S.TicketInfoContainer>
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
      </S.TicketInfoContainer>
      <ChkBox checked={checked} />
    </S.Container>
  );
}

export default TicketBox;
