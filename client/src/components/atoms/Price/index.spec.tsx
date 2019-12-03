import React from 'react';
import { mount } from 'enzyme';

import Price from '.';

describe('Atom / Price', () => {
  describe('SNAPSHOT', () => {
    it('Rendering', () => {
      const wrapper = mount(
        <Price mount={16000000} currency={'₩'} separated={true} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
