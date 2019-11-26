import React from 'react';
import { mount } from 'enzyme';
import Label from '.';

describe('Atom / Divider', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<Label required={false} name={'이메일'} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
