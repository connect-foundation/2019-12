import React from 'react';

import { EVENT_NAME_MAX_LENGTH } from '../../../commons/constants/number';
import * as S from './style';
import Divider from '../../atoms/Divider';

export interface Props {
  /** 이벤트 URL */
  href: string;
  /** 이벤트 이름 */
  imgSrc: string;
  /** 이벤트 날짜 */
  date: string;
  /** 이벤트 이름 */
  name: string;
  /** 호스트 이름 */
  host: string;
  /** 가격 */
  price: string;
}

function Card({
  href,
  imgSrc,
  date,
  name,
  host,
  price,
}: Props): React.ReactElement {
  return (
    <S.LinkWrapper href={href}>
      <S.HeaderWrapper></S.HeaderWrapper>
      <S.ImgDiv imgSrc={imgSrc} />
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
