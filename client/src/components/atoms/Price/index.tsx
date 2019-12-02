import React from 'react';

import * as S from './style';
import currencyDecorator from 'utils/currencyDecorator';

export interface PriceProps {
  mount: number;
  currency?: '₩' | '$';
  separated?: boolean;
}

function Price({
  mount,
  currency = '₩',
  separated = false,
}: PriceProps): React.ReactElement {
  const convertedCurrency = currencyDecorator(mount, currency, separated);

  return <S.Wrapper>{convertedCurrency}</S.Wrapper>;
}

export default Price;
