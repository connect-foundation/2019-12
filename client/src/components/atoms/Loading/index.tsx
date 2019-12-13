import React from 'react';

import * as S from './style';

function Loading(): React.ReactElement {
  return (
    <S.Wrapper>
      <S.LoadingWrapper>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </S.LoadingWrapper>
    </S.Wrapper>
  );
}

export default Loading;
