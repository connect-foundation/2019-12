import React from 'react';
import * as S from './style';
import Btn from 'components/atoms/Btn';
import { CREATE_EVENT } from 'commons/constants/string';

interface Props {
  imgSrc?: string;
}

function MainBanner({
  imgSrc = 'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1',
}: Props): React.ReactElement {
  return (
    <S.Wrapper imgSrc={imgSrc}>
      <S.Container>
        <S.Title>
          <div>이벤트를 만나는</div>
          <div>가장 쉬운 방법</div>
        </S.Title>
        <Btn styletype="primary" to={'/'} content={CREATE_EVENT} />
      </S.Container>
    </S.Wrapper>
  );
}

export default MainBanner;