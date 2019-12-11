import React, { useState } from 'react';

import * as S from './style';
import { FaTicketAlt, FaRegCreditCard } from 'react-icons/fa';
import { IconLabel, Price } from 'components';
import ChkBox, { Props as ChkBoxProps } from 'components/atoms/ChkBox';
import { TicketType } from 'types/Data';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

interface Props extends TicketType {
  chkBoxProps: ChkBoxProps;
  checked?: boolean;
  chkBoxDesc?: string;
  showDueDate?: boolean;
  showPurchaseDate?: string;
  showTicketId?: number;
}

function TicketBox({
  price,
  name,
  desc,
  salesStartAt,
  salesEndAt,
  chkBoxProps,
  chkBoxDesc,
  showDueDate,
  showPurchaseDate,
  showTicketId,
}: Props): React.ReactElement {
  const [checked, setChecked] = useState(false);
  const remainDays = calculateDiffDaysOfDateRange(salesStartAt, salesEndAt);

  if (chkBoxProps.onClick) {
    const copyParentOnClick = Object.assign(chkBoxProps.onClick);
    chkBoxProps.onClick = event => {
      copyParentOnClick(event);
      setChecked(!checked);
    };
  } else {
    chkBoxProps.onClick = () => {
      setChecked(!checked);
    };
  }

  return (
    <S.Container checked={checked}>
      <S.TicketInfoContainer>
        <S.Name>{name}</S.Name>
        <S.PriceWrapper>
          <Price mount={price} separated={true} />
        </S.PriceWrapper>
        <S.Desc>{desc}</S.Desc>
        {showTicketId && (
          <IconLabel
            icon={<FaTicketAlt size={'1.5rem'} />}
            labelContent={`Ticket ID ${showTicketId}`}
          />
        )}
        {showPurchaseDate && (
          <IconLabel
            icon={<FaRegCreditCard size={'1.5rem'} />}
            labelContent={`결제일 ${showPurchaseDate}`}
          />
        )}
        {showDueDate && (
          <IconLabel
            icon={<FaTicketAlt size={'1.5rem'} />}
            labelContent={`${remainDays}일 후에 판매마감`}
          />
        )}
      </S.TicketInfoContainer>

      <S.OptionalContentWrapper>
        <S.ChkBoxContainer>
          {chkBoxDesc && <S.ChkBoxDesc>{chkBoxDesc}</S.ChkBoxDesc>}
          <ChkBox {...chkBoxProps} />
        </S.ChkBoxContainer>
        <S.RefundBtn fit styletype={'transparent'} children={'환불하기'} />
      </S.OptionalContentWrapper>
    </S.Container>
  );
}

export default TicketBox;
