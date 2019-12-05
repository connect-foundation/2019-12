import React from 'react';
import { mount } from 'enzyme';
import ImgBtn from '.';

describe('Molecules / ImgBtn', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(
      <ImgBtn
        src="https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1"
        alt={'img btn alt'}
        href="http://naver.com"
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
