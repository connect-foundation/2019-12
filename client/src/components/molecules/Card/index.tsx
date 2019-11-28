import React, { useState } from 'react';

import { EVENT_NAME_MAX_LENGTH } from '../../../commons/constants/number';
import * as S from './style';
import Divider from '../../atoms/Divider';
import { useIntersect } from '../../../hooks';

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
}

function Card({
  to,
  imgSrc,
  date,
  title,
  host,
  price,
}: Props): React.ReactElement {
  /**
   * 추후에 lazy loading을 포함한 Img Atom Component를 만들 예정
   * by inthewalter
   */
  const [img, setImage] = useState('');
  const [, setRef] = useIntersect(
    async (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver,
    ) => {
      setImage(imgSrc);
      observer.unobserve(entry.target);
    },
    {
      threshold: 0.1,
    },
  );
  const eventTitle =
    title.length >= EVENT_NAME_MAX_LENGTH
      ? `${title.slice(0, EVENT_NAME_MAX_LENGTH)}...`
      : title;
  return (
    <S.LinkWrapper to={to}>
      <S.HeaderWrapper></S.HeaderWrapper>
      <S.ImgDiv imgSrc={img} ref={setRef} />
      <S.InnerContainer>
        <S.ContentContainer>
          <S.Date>{date}</S.Date>
          <S.Title>{eventTitle}</S.Title>
          <S.Host>{host}</S.Host>
        </S.ContentContainer>
        <S.FooterContainer>
          <Divider />
          <S.Price>{price}</S.Price>
        </S.FooterContainer>
      </S.InnerContainer>
    </S.LinkWrapper>
  );
}

export default Card;
