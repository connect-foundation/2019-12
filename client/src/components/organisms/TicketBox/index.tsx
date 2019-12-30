import React, { useState } from 'react';
import moment from 'moment';

import * as S from './style';
import {
  FaTicketAlt,
  FaRegCreditCard,
  FaCheckCircle,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { IconLabel, Price } from 'components';
import Btn, { Props as BtnProps } from 'components/atoms/Btn';
import ChkBox, { Props as ChkBoxProps } from 'components/atoms/ChkBox';
import { TicketType } from 'types/Data';
import { default as Theme } from 'commons/style/themes/default';

const { palette } = Theme;

type PickProps = Pick<TicketType, 'price' | 'name' | 'desc' | 'salesEndAt'>;
export interface Props extends PickProps {
  chkProps: ChkBoxProps;
  refundBtnProps?: BtnProps;
  checked?: boolean;
  chkDesc?: string;
  purchaseDate?: string;
  ticketId?: string;
  showDueDate?: boolean;
  showPurchaseDate?: boolean;
  showTicketId?: boolean;
  showChkIcon?: boolean;
  showRefundBtn?: boolean;
  disabledChkIcon?: boolean;
}

function TicketBox({
  chkProps,
  refundBtnProps,
  checked,
  purchaseDate,
  ticketId,
  price,
  name,
  desc,
  salesEndAt,
  showChkIcon,
  chkDesc,
  showDueDate,
  showPurchaseDate,
  showTicketId,
  showRefundBtn,
  disabledChkIcon,
}: Props): React.ReactElement {
  const [isChecked, setChecked] = useState(checked);

  const remainDays = moment(salesEndAt).diff(moment(), 'days');

  if (chkProps.onClick) {
    const copyParentOnClick = chkProps.onClick;
    chkProps.onClick = (event): void => {
      copyParentOnClick(event);
      setChecked(!isChecked);
    };
  } else {
    chkProps.onClick = (): void => {
      setChecked(!checked);
    };
  }

  return (
    <S.Container data-testid={'ticket-box'} checked={!!isChecked}>
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
            icon={<FaRegCalendarAlt size={'1.5rem'} />}
            labelContent={
              remainDays !== 0
                ? `${remainDays}일 후에 판매마감`
                : '오늘 마감입니다!'
            }
          />
        )}
      </S.TicketInfoContainer>

      <S.OptionalContentWrapper showOptionBtn={!!showRefundBtn}>
        <S.ChkBoxContainer>
          {chkDesc && <S.ChkBoxDesc>{chkDesc}</S.ChkBoxDesc>}
          {showChkIcon && (
            <S.IconWrapper disabledChkIcon={!!disabledChkIcon}>
              <FaCheckCircle
                onClick={(): void => {
                  if (disabledChkIcon) {
                    return;
                  }
                  setChecked(!isChecked);
                }}
                size={'3rem'}
                color={isChecked ? palette.success : palette.grayscale[4]}
              />
            </S.IconWrapper>
          )}
          {!showChkIcon && <ChkBox {...chkProps} />}
        </S.ChkBoxContainer>
        {showRefundBtn && refundBtnProps && (
          <Btn
            {...refundBtnProps}
            data-testid={'refund-btn'}
            fit
            styletype={'transparent'}
            children={refundBtnProps.children}
          />
        )}
      </S.OptionalContentWrapper>
    </S.Container>
  );
}

export default TicketBox;
