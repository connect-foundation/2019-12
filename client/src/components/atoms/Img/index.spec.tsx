import React from 'react';
import { mount } from 'enzyme';
import Img from '.';

describe('Atom / Img', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(
      <Img
        alt="main banner img"
        src={
          'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1'
        }
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
