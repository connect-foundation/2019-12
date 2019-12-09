import React from 'react';
import { mount } from 'enzyme';

import IconBtn from '.';
import ExternalLinkSymbol from 'assets/img/external-link-black.svg';
import ExternalLinkSymbolColored from 'assets/img/external-link-colored.svg';
const tempCircleImgSrc =
  'https://cf.festa.io/default-images/host-profiles/Profile-00047.jpg';

describe('Atom / IconBtn', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(
      <IconBtn
        iconSrc={ExternalLinkSymbol}
        content={'IconButton'}
        styletype={'primary'}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[SNAPSHOT] with circular img 렌더링', () => {
    const wrapper = mount(
      <IconBtn
        height={'2rem'}
        iconSrc={ExternalLinkSymbol}
        hoveredIconSrc={ExternalLinkSymbolColored}
        circleImgSrc={tempCircleImgSrc}
        content={'IconButtonWithCircleImg'}
        styletype={'transparent-hover'}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('[PROPS] fullid prop에 따라 속성이 변경된다.', () => {
    // given
    const fullidWrapper = mount(
      <IconBtn
        fullid={true}
        iconSrc={ExternalLinkSymbol}
        content={'IconButton'}
        styletype={'primary'}
      />,
    );

    const notFullidwrapper = mount(
      <IconBtn
        iconSrc={ExternalLinkSymbol}
        content={'IconButton'}
        styletype={'primary'}
      />,
    );

    // then
    // '100%', 'fit-content'
    expect(fullidWrapper).toHaveStyleRule('width', '100%');
    expect(notFullidwrapper).toHaveStyleRule('width', 'fit-content');
  });

  it('[DOM] 그려져야 하는 이미지 개수가 일치한다.', () => {
    // given
    const wrapper = mount(
      <IconBtn
        height={'2rem'}
        iconSrc={ExternalLinkSymbol}
        hoveredIconSrc={ExternalLinkSymbolColored}
        circleImgSrc={tempCircleImgSrc}
        content={'IconButtonWithCircleImg'}
        styletype={'transparent-hover'}
      />,
    );

    // then
    expect(wrapper.prop('hoveredIconSrc')).toBeTruthy();
    const imgs = wrapper.find('img');
    expect(imgs).toHaveLength(3);
  });
});
