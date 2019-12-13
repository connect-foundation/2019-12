import React from 'react';

import * as S from './style';
import currencyDecorator from 'utils/currencyDecorator';

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
  const convertedCurrency = currencyDecorator(children, currency, separated);

  return (
    <S.Wrapper>
      {+convertedCurrency === 0 ? '무료' : convertedCurrency}
    </S.Wrapper>
  );
}

export default Price;
