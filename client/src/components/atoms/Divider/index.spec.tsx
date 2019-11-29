import React from 'react';
import { mount } from 'enzyme';
import Divider from '.';

describe('Atom / Divider', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<Divider />);

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
