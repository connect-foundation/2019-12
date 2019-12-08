import React from 'react';
import { mount } from 'enzyme';
import Icon from '.';
import ExternalLinkSymbol from 'assets/img/external-link-symbol.svg';

describe('Atom / Icon', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<Icon alt="string" src={ExternalLinkSymbol} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[SNAPSHOT] Circular 렌더링', () => {
    // given
    const wrapper = mount(
      <Icon
        alt={'External Link Icon'}
        height={'2rem'}
        src={ExternalLinkSymbol}
        circular={true}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[PROPS] circular가 true라면 둥근 이미지를 그려낸다.', () => {
    // given
    const wrapper = mount(
      <Icon
        alt={'External Link Icon'}
        height={'2rem'}
        src={ExternalLinkSymbol}
        circular={true}
      />,
    );

    // then
    expect(wrapper).toHaveStyleRule('border-radius', '50%');
  });
});
