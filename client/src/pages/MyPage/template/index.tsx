import React from 'react';

import * as S from './style';
import BasedTemplate from 'pages/BasedTemplate/templates';

interface Props {
  lnbTab: React.ReactElement;
}

function MyPageTemplate({ lnbTab }: Props): React.ReactElement {
  return (
    <BasedTemplate hasHeaderLine>
      <S.Container></S.Container>
      {lnbTab}
    </BasedTemplate>
  );
}

export default MyPageTemplate;
