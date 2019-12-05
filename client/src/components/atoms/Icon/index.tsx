import React from 'react';

import * as S from './style';

export interface IconProps {
  /** 접근성 대응 */
  alt: string;
  /** 크기 */
  height?: string;
  /** 아이콘 소스 */
  src: any;
  /** custom style */
  style?: object;
  /** circular img */
  circular?: boolean;
}

function Icon({ height = '2rem', ...props }: IconProps): React.ReactElement {
  return <S.Img height={height} {...props} />;
}

export default Icon;
