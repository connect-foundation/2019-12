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
    <S.Btn {...props}>
      <S.Img alt={alt} src={src} />
    </S.Btn>
  );
}

export default ImgBtn;
