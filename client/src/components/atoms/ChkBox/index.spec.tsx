import React from 'react';
import { mount } from 'enzyme';
import ChkBox from '.';

describe('Atom / ChkBox', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<ChkBox checked={false} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[PROP] checked에 따라 체크 표시가 된다.', () => {
    // given
    const wrapper = mount(<ChkBox checked={false} />);
    const wrapperChcked = mount(<ChkBox checked={true} />);

    // then
    const imgElement = wrapper.find('img');
    const imgElementBeShown = wrapperChcked.find('img');

    expect(imgElement).toHaveLength(0);
    expect(imgElementBeShown).toHaveLength(1);
  });

  it('체크박스를 클릭했을 때 체크 표시된다.', () => {
    // given
    const wrapper = mount(<ChkBox checked={false} />);

    // when
    wrapper.simulate('click');

    // then
    const imgElement = wrapper.find('img');
    expect(imgElement).toHaveLength(1);
  });
});
