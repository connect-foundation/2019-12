import React, { useState } from 'react';

import * as S from './style';
import { FaTicketAlt } from 'react-icons/fa';
import { IconLabel, Price } from 'components';
import ChkBox, { Props as ChkBoxProps } from 'components/atoms/ChkBox';
import { TicketType } from 'types/Data';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

interface Props extends TicketType {
  chkBoxProps: ChkBoxProps;
  checked?: boolean;
}

function TicketBox({
  price,
  name,
  desc,
  salesStartAt,
  salesEndAt,
  chkBoxProps,
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
        <IconLabel
          icon={<FaTicketAlt size={'1.5rem'} />}
          labelContent={`${remainDays}일 후에 판매마감`}
        />
      </S.TicketInfoContainer>
      <ChkBox {...chkBoxProps} />
    </S.Container>
  );
}

export default TicketBox;
