import React from 'react';

import * as S from './style';
import { TicketType } from 'types/Data';
import { IconLabel, Price } from 'components';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

import { FaTicketAlt, FaCheck, FaRegCalendarAlt } from 'react-icons/fa';
import {
  TICKET_INVALID_DATE,
  TICKET_REMAIN_DAYS,
  TICKET_COMMING_SOON,
} from 'commons/constants/string';

interface Prop extends TicketType {
  count?: number;
  doneEvent?: boolean;
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
  quantity,
  doneEvent,
}: Prop): React.ReactElement {
  const remainCnt = quantity - leftCnt;

  function makeLabelContent(salesStartAt: string) {
    const UtcDate = new Date();
    UtcDate.setHours(-9);

    const remainDays = calculateDiffDaysOfDateRange(
      UtcDate.toString(),
      salesEndAt,
    );

    if (!doneEvent) {
      return `${remainDays}${TICKET_REMAIN_DAYS}`;
    }

    if (remainDays <= 0) {
      return TICKET_INVALID_DATE;
    }

    const convertToUTCDate = new Date();
    convertToUTCDate.setHours(-9);

    const commingDays = calculateDiffDaysOfDateRange(
      convertToUTCDate.toString(),
      salesStartAt,
    );
    return `${commingDays}${TICKET_COMMING_SOON}`;
  }

  return (
    <>
      <S.TicketLabel>티켓</S.TicketLabel>
      <S.TicketContentContainer>
        <S.TicketContentWrapContainer disabled={!!doneEvent}>
          <S.TicketPriceWrapper>
            <Price separated>{price}</Price>
          </S.TicketPriceWrapper>
          <S.TicketName>{`${name} ${count ? `* ${count}` : ''}`}</S.TicketName>
          <S.TicketDesc>{desc}</S.TicketDesc>
          {leftCnt !== -1 && (
            <IconLabel
              icon={<FaTicketAlt size={'1.5rem'} />}
              labelContent={`${remainCnt}개 남음`}
            />
          )}

          <IconLabel
            icon={<FaCheck size={'1.5rem'} />}
            labelContent={`1인당 ${maxCntPerPerson}개 구입 가능`}
          />
          <IconLabel
            icon={<FaRegCalendarAlt size={'1.5rem'} />}
            labelContent={makeLabelContent(salesStartAt)}
          />
        </S.TicketContentWrapContainer>
      </S.TicketContentContainer>
    </>
  );
}

export default Ticket;
