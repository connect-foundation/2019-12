import React from 'react';

import * as S from './style';
import numberDecorator from 'utils/numberDecorator';

export interface PriceProps {
  children: number;
  currency?: '₩';
  separated?: boolean;
}

function Price({
  children,
  currency = '₩',
  separated = false,
}: PriceProps): React.ReactElement {
  return (
    <S.Wrapper>
      {+children === 0
        ? '무료'
        : numberDecorator({
            mount: children,
            currency,
            separated,
          })}
    </S.Wrapper>
  );
}

export default Price;
