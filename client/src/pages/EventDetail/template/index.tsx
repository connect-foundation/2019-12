import React from 'react';

import * as S from './style';
import { EventDetail } from '../../../types/Data';
import IconBtn from '../../../components/molecules/IconBtn';
import Icon from '../../../components/atoms/Icon';
import GoogleMap from '../../../components/atoms/GoogleMap';

import ExternalSymbolBlack from '../../../assets/img/external-link-black.svg';
import ExternalSymbolColored from '../../../assets/img/external-link-colored.svg';
import MultipleUsers from '../../../assets/img/multiple-users-silhouette.svg';
import Check from '../../../assets/img/check-black.svg';
import Calendar from '../../../assets/img/calendar-black.svg';

// temporary value
const CircleImgSrc =
  'https://cf.festa.io/img/2019-5-30/754f6674-e1e4-41d0-b24b-f4bef430dfe5.jpeg';

const defaultLocation = {
  lat: 37.5662952,
  lng: 126.9779451,
};

interface Props {
  data: EventDetail;
}

function EventDetailTemplate({ data }: Props): React.ReactElement {
  const {
    title,
    startAt,
    endAt,
    place,
    address,
    placeDesc,
    mainImg,
    desc,
    ticketTypes,
    user,
  } = data;

  const ticketInfo = ticketTypes[0];
  return (
    <S.Container>
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
              <S.Date>{startAt}</S.Date>
              <S.Date>{'시간 / 요일 정보'}</S.Date>
            </S.DateContainer>
            <S.Label>주최</S.Label>
            <IconBtn
              styletype={'transparent-hover'}
              content={user.firstName + user.lastName}
              circleImgSrc={CircleImgSrc}
              iconSrc={ExternalSymbolBlack}
              hoveredIconSrc={ExternalSymbolColored}
            />
          </S.HostDetailContainer>
        </S.HostContainer>
      </S.BannerContainer>
      <S.Price>무료</S.Price>
      <S.SubmitContainer>
        <S.ReservedPeopleContainer>
          <Icon alt={'people'} src={MultipleUsers} />
          <S.ReservedPeople>{ticketInfo.leftCnt}명</S.ReservedPeople>
        </S.ReservedPeopleContainer>
        <S.SubmitBtn styletype={'primary'} content={'등록'} />
      </S.SubmitContainer>
      <S.DetailContainer>
        <S.ContentContainer>
          <div dangerouslySetInnerHTML={{ __html: desc }} />
        </S.ContentContainer>
        <S.TicketContainer>
          <S.TicketLabel>티켓</S.TicketLabel>
          <S.TicketContentContainer>
            <S.TicketContentWrapContainer>
              <S.TicketPrice>₩{ticketInfo.price}</S.TicketPrice>
              <S.TicketName>{ticketInfo.name}</S.TicketName>
              <S.TicketDesc>{ticketInfo.desc}</S.TicketDesc>
              <S.DescWithIcon>
                <Icon height={'1.5rem'} alt={'check'} src={Check} />
                <S.IconLabel>
                  1인당 {ticketInfo.maxCntPerPerson}개 구입 가능
                </S.IconLabel>
              </S.DescWithIcon>
              <S.DescWithIcon>
                <Icon height={'1.5rem'} alt={'calendar'} src={Calendar} />
                <S.IconLabel>
                  {ticketInfo.salesEndAt.split('T')[0]} 판매마감
                </S.IconLabel>
              </S.DescWithIcon>
              <S.DescWithIcon>
                <Icon height={'1.5rem'} alt={'people'} src={MultipleUsers} />
                <S.IconLabel>{ticketInfo.leftCnt}개 판매</S.IconLabel>
              </S.DescWithIcon>
            </S.TicketContentWrapContainer>
          </S.TicketContentContainer>
        </S.TicketContainer>
      </S.DetailContainer>
      <S.PlaceDetailContainer>
        <GoogleMap location={defaultLocation} />
        <S.PlcaeLabel>장소</S.PlcaeLabel>
        <S.PlaceName>{place}</S.PlaceName>
        <S.PlaceDetail>{address}</S.PlaceDetail>
        <S.PlaceDetail>{placeDesc}</S.PlaceDetail>
      </S.PlaceDetailContainer>
    </S.Container>
  );
}

export default EventDetailTemplate;
