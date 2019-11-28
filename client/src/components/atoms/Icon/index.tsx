import React from 'react';

import * as S from './style';
import { circular } from './index.stories';

export interface Props {
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

function Icon({ height = '2rem', ...props }: Props): React.ReactElement {
  return <S.Img height={height} {...props} />;
}

export default Icon;
