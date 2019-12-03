import React from 'react';

import * as S from './style';
import Icon from '../../atoms/Icon';
import IconBtn from '../../molecules/IconBtn';
import Price from '../../atoms/Price';
import { User, TicketType } from '../../../types/Data';

import MultipleUsers from '../../../assets/img/multiple-users-silhouette.svg';
import ExternalSymbolBlack from '../../../assets/img/external-link-black.svg';
import ExternalSymbolColored from '../../../assets/img/external-link-colored.svg';

interface Props {
  mainImg: string;
  title: string;
  place: string;
  startAt: string;
  endAt: string;
  user: User;
  ticketType: TicketType;
}

function EventHeader({
  mainImg,
  title,
  place,
  startAt,
  endAt,
  user,
  ticketType,
}: Props): React.ReactElement {
  const ticketInfo = ticketType;
  const { firstName, lastName, profileImgUrl } = user;

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
              <S.Date>{startAt}</S.Date>
              <S.Date>{endAt}</S.Date>
            </S.DateContainer>
            <S.Label>주최</S.Label>
            <IconBtn
              styletype={'transparent-hover'}
              content={lastName + firstName}
              circleImgSrc={profileImgUrl}
              iconSrc={ExternalSymbolBlack}
              hoveredIconSrc={ExternalSymbolColored}
            />
          </S.HostDetailContainer>
        </S.HostContainer>
      </S.BannerContainer>
      <S.PriceWrapper>
        <Price mount={ticketInfo.price} separated={true} />
      </S.PriceWrapper>
      <S.SubmitContainer>
        <S.ReservedPeopleContainer>
          <Icon alt={'people'} src={MultipleUsers} />
          <S.ReservedPeople>{ticketInfo.leftCnt}명</S.ReservedPeople>
        </S.ReservedPeopleContainer>
        <S.SubmitBtn children={'등록'} />
      </S.SubmitContainer>
    </S.HeaderContainer>
  );
}

export default EventHeader;
