import React, { useState } from 'react';

import * as S from './style';
import Icon from 'components/atoms/Icon';
import LeftArrow from 'assets/img/left-arrow.svg';
import RightArrow from 'assets/img/right-arrow.svg';

interface Props {
  minCount: number;
  maxCount: number;
  handler?: (count: number) => void;
}

function Counter({ minCount, maxCount, ...props }: Props): React.ReactElement {
  const [count, setCount] = useState(0);
  const { handler } = props;

  const increase = () => {
    if (count < maxCount) {
      const draftCount = count + 1;
      setCount(draftCount);
      if (handler) {
        handler(draftCount);
      }
    }
  };

  const decrease = () => {
    if (count > minCount) {
      const draftCount = count - 1;
      setCount(draftCount);
      if (handler) {
        handler(draftCount);
      }
    }
  };

  return (
    <S.Container>
      <S.ArrowWrapper onClick={decrease}>
        <Icon height={'1.5rem'} alt={'left count'} src={LeftArrow} />
      </S.ArrowWrapper>
      <S.Count>{count}</S.Count>
      <S.ArrowWrapper onClick={increase}>
        <Icon height={'1.5rem'} alt={'right count'} src={RightArrow} />
      </S.ArrowWrapper>
    </S.Container>
  );
}

export default Counter;
