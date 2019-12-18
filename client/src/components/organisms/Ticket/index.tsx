import React from 'react';

import * as S from './style';
import { TicketType } from 'types/Data';
import { IconLabel, Price } from 'components';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

import { FaTicketAlt, FaCheck, FaRegCalendarAlt } from 'react-icons/fa';

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
  const remainDays = calculateDiffDaysOfDateRange(
    Date().toString(),
    salesEndAt,
  );
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
          <IconLabel
            icon={<FaTicketAlt size={'1.5rem'} />}
            labelContent={`${remainCnt}개 남음`}
          />
          <IconLabel
            icon={<FaCheck size={'1.5rem'} />}
            labelContent={`1인당 ${maxCntPerPerson}개 구입 가능`}
          />
          <IconLabel
            icon={<FaRegCalendarAlt size={'1.5rem'} />}
            labelContent={
              remainDays <= 0
                ? '판매기간이 종료되었습니다.'
                : `${remainDays}일 후에 판매마감`
            }
          />
        </S.TicketContentWrapContainer>
      </S.TicketContentContainer>
    </>
  );
}

export default Ticket;
