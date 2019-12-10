import React from 'react';

import * as S from './style';
import Icon, { Props as IconProps } from 'components/atoms/Icon';

export interface Props {
  iconProps: IconProps;
  labelContent: string;
}

function IconLabel({ iconProps, labelContent }: Props): React.ReactElement {
  return (
    <S.Container>
      <Icon {...iconProps} />
      <S.Label>{labelContent}</S.Label>
    </S.Container>
  );
}

export default IconLabel;
