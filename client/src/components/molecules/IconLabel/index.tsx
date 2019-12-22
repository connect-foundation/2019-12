import React from 'react';

import * as S from './style';

export interface Props {
  icon: React.ReactNode;
  labelContent: string;
}

function IconLabel({ icon, labelContent }: Props): React.ReactElement {
  return (
    <S.Container data-testid={'icon-label'}>
      {icon}
      <S.Label>{labelContent}</S.Label>
    </S.Container>
  );
}

export default IconLabel;
