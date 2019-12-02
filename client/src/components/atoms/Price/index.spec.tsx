import React from 'react';
import { mount } from 'enzyme';

import Price, { currencyDecorator, PriceProps } from '.';

describe('Atom / Price', () => {
  describe('SNAPSHOT', () => {
    it('Rendering', () => {
      const wrapper = mount(
        <Price mount={16000000} currency={'₩'} separated={true} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('currencyDecorator function', () => {
    // given
    const targetData = {
      mount: 16000000,
      currency: '₩',
      separated: true,
    } as PriceProps;

    it('currency가 표시된다.', () => {
      // when
      const result = currencyDecorator(targetData);
      const currencyIndex = result.indexOf('₩');

      // then
      expect(currencyIndex).toBe(0);
    });

    it('separated에 따라 분리하거나 분리하지 않는다.', () => {
      // when
      const result = currencyDecorator(targetData);
      const commas = result.split(',');

      const firstCommaIndex = result.indexOf(',');
      const lastCommaIndex = result.indexOf(',', firstCommaIndex + 1);

      // then
      expect(commas).toHaveLength(3);
      expect(firstCommaIndex).toBe(4);
      expect(lastCommaIndex).toBe(8);
    });

    it('currency와 separated 된 값이 반환된다.', () => {
      // when
      const result = currencyDecorator(targetData);

      // then
      expect(result).toBe('₩ 16,000,000');
    });
  });
});
