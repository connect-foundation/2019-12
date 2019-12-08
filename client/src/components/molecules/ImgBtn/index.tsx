import React from 'react';

import * as S from './style';

interface Props {
  /** img src */
  src: string;
  /** img alt */
  alt: string;
  /** react-router/Link 사용 (내부적인 routing)*/
  to?: string;
  /** 외부 링크 */
  href?: string;
}

function ImgBtn({ src, alt, ...props }: Props): React.ReactElement {
  return (
    <S.Button {...props}>
      <S.Image alt={alt} src={src} />
    </S.Button>
  );
}

export default ImgBtn;
