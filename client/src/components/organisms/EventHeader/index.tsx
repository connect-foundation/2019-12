import React from 'react';

import * as S from './style';
import { IconBtn, Price, EventDate } from 'components';
import { User, TicketType } from 'types/Data';
import { FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

interface Props {
  id: number;
  mainImg: string;
  title: string;
  place: string;
  startAt: string;
  endAt: string;
  user: User;
  ticketType: TicketType;
  doneEventType?: number;
}

function EventHeader({
  id: eventId,
  mainImg,
  title,
  place,
  startAt,
  endAt,
  user,
  ticketType,
  doneEventType,
}: Props): React.ReactElement {
  const ticketInfo = ticketType;
  const { firstName, lastName } = user;
  const profileImgUrl =
    'https://kr.object.ncloudstorage.com/bookus/defaultProfileImg.png';
  const doneTypes = [
    '등록',
    '이벤트가 종료되었습니다.',
    '매진되었습니다.',
    '티켓 구매 기간이 지났습니다.',
  ];

  return (
    <S.HeaderContainer>
      <S.BannerContainer>
        <S.BannerImgWrapper>
          <S.BannerImg url={mainImg} />
        </S.BannerImgWrapper>
        <S.HostContainer>
          <S.Title>{title}</S.Title>
          <S.ShortPlace>at {place}</S.ShortPlace>
          <S.HostDetailContainer>
            <S.Label>일시</S.Label>
            <S.DateContainer>
              <S.Date>
                <EventDate startAt={startAt} endAt={endAt} />
              </S.Date>
            </S.DateContainer>
            <S.Label>주최</S.Label>
            <IconBtn
              btnProps={{
                styletype: 'transparent',
              }}
              icon={FaExternalLinkAlt}
              children={lastName + firstName}
              noneIconColor={'black'}
              circleImgSrc={profileImgUrl}
            />
          </S.HostDetailContainer>
        </S.HostContainer>
      </S.BannerContainer>
      <S.PriceWrapper>
        <Price separated>{ticketInfo.price}</Price>
      </S.PriceWrapper>
      <S.SubmitContainer>
        <S.ReservedPeopleContainer>
          <FaUsers size={'2rem'} />
          <S.ReservedPeople>
            {ticketInfo.leftCnt === -1
              ? '비공개'
              : `${ticketInfo.quantity - ticketInfo.leftCnt}명`}
          </S.ReservedPeople>
        </S.ReservedPeopleContainer>
        <S.SubmitBtn
          children={!doneEventType ? doneTypes[0] : doneTypes[doneEventType]}
          to={`/events/${eventId}/register/tickets`}
          disabled={doneEventType === 1 || doneEventType === 2}
        />
      </S.SubmitContainer>
    </S.HeaderContainer>
  );
}

export default EventHeader;
