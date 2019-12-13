import React, { useState } from 'react';

import * as S from './style';
import { FaTicketAlt, FaRegCreditCard, FaCheckCircle } from 'react-icons/fa';
import { IconLabel, Price, Btn } from 'components';
import ChkBox, { Props as ChkBoxProps } from 'components/atoms/ChkBox';
import { TicketType } from 'types/Data';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';
import { TICKETBOX_REFUND_BTN } from 'commons/constants/string';
import { default as Theme } from 'commons/style/themes/default';

const { palette } = Theme;

interface Props extends TicketType {
  chkProps: ChkBoxProps;
  checked?: boolean;
  chkDesc?: string;
  purchaseDate?: string;
  ticketId?: string;
  showDueDate?: boolean;
  showPurchaseDate?: boolean;
  showTicketId?: boolean;
  showChkIcon?: boolean;
  showRefundBtn?: boolean;
}

function TicketBox({
  chkProps,
  checked,
  purchaseDate,
  ticketId,
  price,
  name,
  desc,
  salesStartAt,
  salesEndAt,
  showChkIcon,
  chkDesc,
  showDueDate,
  showPurchaseDate,
  showTicketId,
  showRefundBtn,
}: Props): React.ReactElement {
  const [isChecked, setChecked] = useState(checked);
  const remainDays = calculateDiffDaysOfDateRange(salesStartAt, salesEndAt);

  if (chkProps.onClick) {
    const copyParentOnClick = Object.assign(chkProps.onClick);
    chkProps.onClick = event => {
      copyParentOnClick(event);
      setChecked(!isChecked);
    };
  } else {
    chkProps.onClick = () => {
      setChecked(!checked);
    };
  }

  return (
    <S.Container checked={!!isChecked}>
      <S.TicketInfoContainer>
        <S.Name>{name}</S.Name>
        <S.PriceWrapper>
          <Price separated>{price}</Price>
        </S.PriceWrapper>
        <S.Desc>{desc}</S.Desc>
        {showTicketId && (
          <IconLabel
            icon={<FaTicketAlt size={'1.5rem'} />}
            labelContent={`Ticket ID ${ticketId}`}
          />
        )}
        {showPurchaseDate && (
          <IconLabel
            icon={<FaRegCreditCard size={'1.5rem'} />}
            labelContent={`결제일 ${purchaseDate}`}
          />
        )}
        {showDueDate && (
          <IconLabel
            icon={<FaTicketAlt size={'1.5rem'} />}
            labelContent={`${remainDays}일 후에 판매마감`}
          />
        )}
      </S.TicketInfoContainer>

      <S.OptionalContentWrapper showOptionBtn={!!showRefundBtn}>
        <S.ChkBoxContainer>
          {chkDesc && <S.ChkBoxDesc>{chkDesc}</S.ChkBoxDesc>}
          {showChkIcon && (
            <S.IconWrapper>
              <FaCheckCircle
                onClick={() => {
                  setChecked(!isChecked);
                }}
                size={'3rem'}
                color={isChecked ? palette.success : palette.grayscale[4]}
              />
            </S.IconWrapper>
          )}
          {!showChkIcon && <ChkBox {...chkProps} />}
        </S.ChkBoxContainer>
        {showRefundBtn && (
          <Btn fit styletype={'transparent'} children={TICKETBOX_REFUND_BTN} />
        )}
      </S.OptionalContentWrapper>
    </S.Container>
  );
}

export default TicketBox;
