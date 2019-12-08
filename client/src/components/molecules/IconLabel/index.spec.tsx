import React from 'react';
import { mount } from 'enzyme';

import IconLabel from '.';
import Check from 'assets/img/check-black.svg';

describe('Atom / IconBtn', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(
      <IconLabel
        iconProps={{
          height: '1.5rem',
          alt: 'check',
          src: Check,
        }}
        labelContent={'1인당 2개 구입 가능'}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
