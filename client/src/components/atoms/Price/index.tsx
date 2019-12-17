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
  const convertedCurrency = numberDecorator({
    mount: children,
    currency,
    separated,
  });

  return (
    <S.Wrapper>
      {+convertedCurrency === 0 ? '무료' : convertedCurrency}
    </S.Wrapper>
  );
}

export default Price;
