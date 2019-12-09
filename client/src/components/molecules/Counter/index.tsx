import React, { useState, useEffect, useCallback, Dispatch } from 'react';

import * as S from './style';
import { Icon } from 'components';
import LeftArrow from 'assets/img/left-arrow.svg';
import RightArrow from 'assets/img/right-arrow.svg';

interface Props {
  minCount: number;
  maxCount: number;
  handler?: (count: number) => void;
}

export function increase(
  count: number,
  maxCount: number,
  setCount: Dispatch<number>,
) {
  if (count < maxCount) {
    setCount(count + 1);
  }
}

export function decrease(
  count: number,
  minCount: number,
  setCount: Dispatch<number>,
) {
  if (count > minCount) {
    setCount(count - 1);
  }
}

function Counter({ minCount, maxCount, handler }: Props): React.ReactElement {
  const [count, setCount] = useState(minCount);
  const [leftArrowDisabled, setLeftArrowDisabled] = useState(false);
  const [rightArrowDisabled, setRightArrowDisabled] = useState(false);

  const callbackIncrease = useCallback(() => {
    increase(count, maxCount, setCount);
  }, [count, maxCount, setCount]);

  const callbackDecrease = useCallback(() => {
    decrease(count, minCount, setCount);
  }, [count, minCount, setCount]);

  useEffect(() => {
    if (handler) {
      handler(count);
    }

    if (count === minCount) {
      return setLeftArrowDisabled(true);
    } else if (leftArrowDisabled) {
      setLeftArrowDisabled(false);
    }

    if (count === maxCount) {
      return setRightArrowDisabled(true);
    } else if (rightArrowDisabled) {
      setRightArrowDisabled(false);
    }
  }, [count, minCount, maxCount, handler, leftArrowDisabled, rightArrowDisabled]);

  return (
    <S.Container>
      <S.ArrowWrapper
        disabled={leftArrowDisabled}
        onClick={() => {
          callbackDecrease();
        }}
      >
        <Icon height={'1.3rem'} alt={'left count'} src={LeftArrow} />
      </S.ArrowWrapper>
      <S.Count>{count}</S.Count>
      <S.ArrowWrapper
        disabled={rightArrowDisabled}
        onClick={() => {
          callbackIncrease();
        }}
      >
        <Icon height={'1.3rem'} alt={'right count'} src={RightArrow} />
      </S.ArrowWrapper>
    </S.Container>
  );
}

export default Counter;
