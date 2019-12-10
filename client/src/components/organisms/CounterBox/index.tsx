import React from 'react';

import * as S from './style';
import Counter, { Props as CounterProps } from 'components/molecules/Counter';

interface Props {
  label: string;
  counterProps: CounterProps;
}

function CounterBox({ label, counterProps }: Props): React.ReactElement {
  const { maxCount } = counterProps;

  return (
    <S.Container data-testid={'counterbox-container'}>
      <S.CountLabel>{label}</S.CountLabel>
      <S.CountDesc>최대 {maxCount}개 구매 가능</S.CountDesc>
      <Counter {...counterProps} />
    </S.Container>
  );
}

export default CounterBox;
