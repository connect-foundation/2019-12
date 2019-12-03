import React from 'react';

import * as S from './style';
import Icon, { IconProps } from '../../atoms/Icon';

export interface IconLabelProps {
  iconProps: IconProps;
  labelContent: string;
}

function IconLabel({
  iconProps,
  labelContent,
}: IconLabelProps): React.ReactElement {
  return (
    <S.Container>
      <Icon {...iconProps} />
      <S.Label>{labelContent}</S.Label>
    </S.Container>
  );
}

export default IconLabel;
