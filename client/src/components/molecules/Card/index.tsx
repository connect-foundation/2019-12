import React, { useState } from 'react';

import { EVENT_NAME_MAX_LENGTH } from '../../../commons/constants/number';
import * as S from './style';
import Divider from '../../atoms/Divider';
import useIntersect from '../../../pages/Main/useIntersect';

export interface Props {
  /** 라우팅 URL */
  to: string;
  /** 이벤트 이름 */
  imgSrc: string;
  /** 이벤트 날짜 */
  date: string;
  /** 이벤트 이름 */
  name: string;
  /** 호스트 이름 */
  host: string;
  /** 가격 */
  price: number;
}

function Card({
  to,
  imgSrc,
  date,
  name,
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

  return (
    <S.LinkWrapper to={to}>
      <S.HeaderWrapper></S.HeaderWrapper>
      <S.ImgDiv imgSrc={img} ref={setRef} />
      <S.InnerContainer>
        <S.ContentContainer>
          <S.Date>{date}</S.Date>
          <S.Name>{`${name.slice(0, EVENT_NAME_MAX_LENGTH)}...`}</S.Name>
          <S.Host>{host}</S.Host>
        </S.ContentContainer>
        <Divider />
        <S.Price>{price}</S.Price>
      </S.InnerContainer>
    </S.LinkWrapper>
  );
}

export default Card;
