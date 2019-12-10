import React from 'react';
import * as S from './style';

export interface Props {
  /** 두께 */
  borderWidth?: string;
  /** Border 스타일 */
  type?: 'solid' | 'dotted';
  /** gray scale level (color) */
  grayScaleLevel?: number;
}

function Divider({
  borderWidth = '1px',
  type = 'solid',
  grayScaleLevel = 5,
}: Props): React.ReactElement {
  return (
    <S.Divider
      borderWidth={borderWidth}
      type={type}
      grayScaleLevel={grayScaleLevel}
    />
  );
}

export default Divider;
