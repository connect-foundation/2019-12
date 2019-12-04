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

function Img({ alt, src, lazy = true }: Props): React.ReactElement {
  const [imgSrc, setImage] = useState(
    lazy ? 'https://media.giphy.com/media/swhRkVYLJDrCE/source.gif' : src,
  );
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
