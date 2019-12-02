import React from 'react';

import * as S from './style';
import Icon, { IconProps } from '../../atoms/Icon';

export interface IconLabelProps {
  iconProps: IconProps;
  labelStr: string;
}

function IconLabel({
  iconProps,
  labelStr,
}: IconLabelProps): React.ReactElement {
  return (
    <S.Container>
      <Icon {...iconProps} />

      <S.Label>{labelStr}</S.Label>
    </S.Container>
  );
}

export default IconLabel;
