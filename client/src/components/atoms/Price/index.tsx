import React from 'react';

import * as S from './style';

export interface PriceProps {
  mount: number;
  currency?: '₩' | '$';
  separated?: boolean;
}

export function currencyDecorator({ mount, currency, separated }: PriceProps) {
  const seperator = (targetStr: string) => {
    return targetStr
      .split('')
      .reverse()
      .reduce<string[]>((acc, cur, i, arr) => {
        if ((i + 1) % 3 === 0 && i !== arr.length - 1) {
          acc = [...acc, cur, ','];
          return acc;
        }
        acc.push(cur);
        return acc;
      }, [])
      .reverse()
      .join('');
  };

  let mountStr = `${mount}`;
  if (separated) {
    mountStr = seperator(mountStr);
  }

  return `${currency} ${mountStr}`;
}

function Price({
  mount,
  currency = '₩',
  separated = false,
}: PriceProps): React.ReactElement {
  const convertedCurrency = currencyDecorator({ mount, currency, separated });

  return <S.Wrapper>{convertedCurrency}</S.Wrapper>;
}

export default Price;
