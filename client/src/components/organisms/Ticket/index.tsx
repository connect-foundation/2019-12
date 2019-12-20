import React from 'react';

import * as S from './style';
import { TicketType } from 'types/Data';
import { IconLabel, Price } from 'components';
import {
  calculateDiffDaysOfDateRange,
  getKoreanDateString,
} from 'utils/dateCalculator';

import { FaTicketAlt, FaCheck, FaRegCalendarAlt } from 'react-icons/fa';
import {
  TICKET_INVALID_DATE,
  TICKET_COMMING_SOON,
} from 'commons/constants/string';

interface Prop extends TicketType {
  count?: number;
}

function Ticket({
  count,
  price,
  name,
  desc,
  maxCntPerPerson,
  salesStartAt,
  salesEndAt,
  leftCnt,
}: Prop): React.ReactElement {
  const disableState = ((): { status: boolean; label: string } => {
    const UtcDate = new Date();
    UtcDate.setHours(UtcDate.getHours() - 9);

    const remainDays = calculateDiffDaysOfDateRange(
      UtcDate.toString(),
      salesEndAt,
    );

    if (remainDays <= 0) {
      return { status: true, label: TICKET_INVALID_DATE };
    }

    const commigDays = calculateDiffDaysOfDateRange(
      UtcDate.toString(),
      salesStartAt,
    );

    if (commigDays > 0) {
      return { status: true, label: `${commigDays}${TICKET_COMMING_SOON}` };
    }

    return {
      status: false,
      label: `${getKoreanDateString(salesEndAt)} 마감`,
    };
  })();

  return (
    <>
      <S.TicketLabel>티켓</S.TicketLabel>
      <S.TicketContentContainer>
        <S.TicketContentWrapContainer disabled={disableState.status}>
          <S.TicketPriceWrapper>
            <Price separated>{price}</Price>
          </S.TicketPriceWrapper>
          <S.TicketName>{`${name} ${count ? `* ${count}` : ''}`}</S.TicketName>
          <S.TicketDesc>{desc}</S.TicketDesc>
          {leftCnt !== -1 && (
            <IconLabel
              icon={<FaTicketAlt size={'1.5rem'} />}
              labelContent={`${leftCnt}개 남음`}
            />
          )}

          <IconLabel
            icon={<FaCheck size={'1.5rem'} />}
            labelContent={`1인당 ${maxCntPerPerson}개 구입 가능`}
          />
          <IconLabel
            icon={<FaRegCalendarAlt size={'1.5rem'} />}
            labelContent={disableState.label}
          />
        </S.TicketContentWrapContainer>
      </S.TicketContentContainer>
    </>
  );
}

export default Ticket;
