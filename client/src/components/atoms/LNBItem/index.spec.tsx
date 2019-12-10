import React from 'react';
import { mount } from 'enzyme';
import LNBItem from '.';

describe('Atom / LNBItem', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<LNBItem active children={'내 티켓'} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
