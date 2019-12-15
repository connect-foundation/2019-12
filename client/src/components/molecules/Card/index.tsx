import React from 'react';

import { EVENT_NAME_MAX_LENGTH } from 'commons/constants/number';
import * as S from './style';
import { Divider, Img, Price, EventDate } from 'components';

export interface Props {
  /** 라우팅 URL */
  to: string;
  /** 이벤트 이름 */
  imgSrc: string;
  /** 이벤트 날짜 */
  date: string;
  /** 이벤트 이름 */
  title: string;
  /** 호스트 이름 */
  host: string;
  /** 가격 */
  price: number;
  setRef?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export const shortenTitle = (title: string) =>
  title.length >= EVENT_NAME_MAX_LENGTH
    ? `${title.slice(0, EVENT_NAME_MAX_LENGTH)}...`
    : title;

function Card({
  to,
  imgSrc,
  date,
  title,
  host,
  price,
  setRef,
}: Props): React.ReactElement {
  const eventTitle = shortenTitle(title);
  return (
    <S.LinkWrapper to={to} data-testid={'main-card'}>
      <S.ImgWrapper ref={setRef}>
        <Img alt={'card Image'} src={imgSrc} />
      </S.ImgWrapper>
      <S.InnerContainer>
        <S.ContentContainer>
          <S.DateWrappeer>
            <S.DateWrappeer>
              <EventDate>{date}</EventDate>
            </S.DateWrappeer>
          </S.DateWrappeer>
          <S.Title>{eventTitle}</S.Title>
          <S.Host>{host}</S.Host>
        </S.ContentContainer>
        <S.FooterContainer>
          <Divider />
          <S.PriceWrapper>
            <Price separated>{price}</Price>
          </S.PriceWrapper>
        </S.FooterContainer>
      </S.InnerContainer>
    </S.LinkWrapper>
  );
}

export default Card;
