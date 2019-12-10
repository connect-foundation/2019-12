import React from 'react';
import { mount } from 'enzyme';
import StepList from '.';

describe('Molecules / StepList', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<StepList steps={['a', 'b', 'c']} pivot={1} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
