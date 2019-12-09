import React from 'react';

import * as S from './style';
import { TicketType } from 'types/Data';
import { IconLabel, Price } from 'components';

import MultipleUsers from 'assets/img/multiple-users-silhouette.svg';
import Check from 'assets/img/check-black.svg';
import Calendar from 'assets/img/calendar-black.svg';

function Ticket({
  price,
  name,
  desc,
  maxCntPerPerson,
  salesEndAt,
  leftCnt,
}: TicketType): React.ReactElement {
  return (
    <>
      <S.TicketLabel>티켓</S.TicketLabel>
      <S.TicketContentContainer>
        <S.TicketContentWrapContainer>
          <S.TicketPriceWrapper>
            <Price mount={price} separated={true} />
          </S.TicketPriceWrapper>
          <S.TicketName>{name}</S.TicketName>
          <S.TicketDesc>{desc}</S.TicketDesc>
          <IconLabel
            iconProps={{ height: '1.5rem', alt: 'check', src: Check }}
            labelContent={`1인당 ${maxCntPerPerson}개 구입 가능`}
          />
          <IconLabel
            iconProps={{ height: '1.5rem', alt: 'calendar', src: Calendar }}
            labelContent={`${salesEndAt.split('T')[0]} 판매마감`}
          />
          <IconLabel
            iconProps={{
              height: '1.5rem',
              alt: 'people',
              src: MultipleUsers,
            }}
            labelContent={`${leftCnt}개 판매`}
          />
        </S.TicketContentWrapContainer>
      </S.TicketContentContainer>
    </>
  );
}

export default Ticket;
