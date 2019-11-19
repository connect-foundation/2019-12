import React from 'react';
import * as S from './style';

interface Props {
  /** 두께 */
  borderWidth?: string;
  /** Border 스타일 */
  type?: 'solid' | 'dotted' | string;
  /** gray scale level (color) */
  grayScaleLevel?: number;
}

const Divider: React.FC<Props> = ({
  borderWidth = '1px',
  type = 'solid',
  grayScaleLevel = 6,
}) => (
  <S.Divider
    borderWidth={borderWidth}
    type={type}
    grayScaleLevel={grayScaleLevel}
  />
);

export default Divider;
