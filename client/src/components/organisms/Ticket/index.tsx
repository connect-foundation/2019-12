import React from 'react';

import * as S from './style';
import { TicketType } from 'types/Data';
import { IconLabel, Price } from 'components';
import { calculateDiffDaysOfDateRange } from 'utils/dateCalculator';

import { FaUsers, FaCheck, FaRegCalendarAlt } from 'react-icons/fa';

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
  return (
    <>
      <S.TicketLabel>티켓</S.TicketLabel>
      <S.TicketContentContainer>
        <S.TicketContentWrapContainer>
          <S.TicketPriceWrapper>
            <Price mount={price} separated={true} />
          </S.TicketPriceWrapper>
          <S.TicketName>{`${name} ${count ? `* ${count}` : ''}`}</S.TicketName>
          <S.TicketDesc>{desc}</S.TicketDesc>
          <IconLabel
            icon={<FaCheck size={'1.5rem'} />}
            labelContent={`1인당 ${maxCntPerPerson}개 구입 가능`}
          />
          <IconLabel
            icon={<FaRegCalendarAlt size={'1.5rem'} />}
            labelContent={`${calculateDiffDaysOfDateRange(
              salesStartAt,
              salesEndAt,
            )}일 후에 판매마감`}
          />
          <IconLabel
            icon={<FaUsers size={'1.5rem'} />}
            labelContent={`${leftCnt}개 판매`}
          />
        </S.TicketContentWrapContainer>
      </S.TicketContentContainer>
    </>
  );
}

export default Ticket;
