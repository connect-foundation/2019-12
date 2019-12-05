import React, { useState } from 'react';

import * as S from './style';
import { useIntersect } from '../../../hooks';

export interface Props {
  /** alternation img */
  alt: string;
  /** image src */
  src: string;
  /** need Lazy Loading */
  lazy?: boolean;
}

function Img({ alt, src, lazy = false }: Props): React.ReactElement {
  // TODO: default 이미지로 저해상도의 사진이 좋을 것 같음
  // 5 Dec 2019 by inthewalter
  const [imgSrc, setImage] = useState(lazy ? '' : src);
  const [, setRef] = useIntersect(
    async (
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver,
    ) => {
      setImage(src);
      observer.unobserve(entry.target);
    },
    {
      rootMargin: '0% 0% 33% 0%',
      threshold: 0.5,
    },
  );

  return <S.Img alt={alt} src={imgSrc} ref={lazy ? setRef : null} />;
}

export default Img;
