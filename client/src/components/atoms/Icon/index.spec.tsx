import React from 'react';
import { mount } from 'enzyme';
import Icon from '.';
import ExternalLinkSymbol from '../../../assets/img/external-link-symbol.svg';

describe('Atom / Divider', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(<Icon alt="string" src={ExternalLinkSymbol} />);

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
