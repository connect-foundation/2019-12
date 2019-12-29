import React, { useState, useEffect } from 'react';

import * as S from './style';
import { IconBtn, Price, EventDate } from 'components';
import { User, TicketType } from 'types/Data';
import { FaUsers, FaExternalLinkAlt } from 'react-icons/fa';
import {
  RESERVE_DONE,
  RESERVE_SOLD_OUT,
  RESERVE_EXPIRE,
  RESERVE,
} from 'commons/constants/string';
import moment, { Moment } from 'moment';

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

interface SubmitBtnState {
  children: string;
  disabled: boolean;
}

const doneTypes = [RESERVE, RESERVE_DONE, RESERVE_SOLD_OUT, RESERVE_EXPIRE];

function useEventBtn(
  salesStartAt: string,
  doneEventType?: number,
): SubmitBtnState {
  const [btn, setBtn] = useState<SubmitBtnState>({
    children: doneTypes[doneEventType || 0],
    disabled: doneEventType !== 0,
  });
  const [timerId, setTimerId] = useState<number>();

  useEffect(() => {
    if (timerId) return;

    function setTime(salesStartAt: Moment): void {
      const diffSeconds = salesStartAt.diff(moment(), 'seconds');
      let delay = 0;

      if (diffSeconds <= 0) {
        delay = 0;
        setBtn({
          children: doneTypes[doneEventType || 0],
          disabled: doneEventType !== 0,
        });
      } else if (diffSeconds <= 60) {
        delay = 300;
        setBtn({
          children: `${diffSeconds}초 후 오픈 예정`,
          disabled: true,
        });
      } else if (diffSeconds <= 3600) {
        delay = 1000 * 10;
        const minutes = Math.floor(diffSeconds / 60);
        setBtn({
          children: `${minutes}분 후 오픈 예정`,
          disabled: true,
        });
      } else if (diffSeconds <= 3600 * 24) {
        delay = 1000 * 60 * 10;
        const hours = Math.floor(diffSeconds / (60 * 60));
        setBtn({
          children: `${hours}시간 후 오픈 예정`,
          disabled: true,
        });
      } else {
        delay = 1000 * 60 * 60;
        const days = Math.floor(diffSeconds / (60 * 60 * 24));
        setBtn({
          children: `${days}일 후 오픈 예정`,
          disabled: true,
        });
      }

      delay > 0 && setTimerId(setTimeout(() => setTime(salesStartAt), delay));
    }

    setTime(moment(salesStartAt));
    return (): void => clearTimeout(timerId);
  }, [salesStartAt, doneEventType, timerId]);

  return btn;
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
  const submitBtnState = useEventBtn(ticketType.salesStartAt, doneEventType);

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
          <S.ReservedPeople data-testid={'left-count'}>
            {!ticketInfo.isPublicLeftCnt
              ? '비공개'
              : `${ticketInfo.quantity - ticketInfo.leftCnt}명`}
          </S.ReservedPeople>
        </S.ReservedPeopleContainer>
        <S.SubmitBtn
          data-testid={'event-detail-submit-btn'}
          {...submitBtnState}
          to={`/events/${eventId}/register/tickets`}
        />
      </S.SubmitContainer>
    </S.HeaderContainer>
  );
}

export default EventHeader;
