import React from 'react';
import { mount } from 'enzyme';
import Input from '.';

describe('Atom / Divider', () => {
  it('[SNAPSHOT] 렌더링', () => {
    // given
    const wrapper = mount(
      <Input
        invalid={true}
        disabled={false}
        defaultValue={'bookusgmail.com'}
        placeholder={'이메일을 입력해주세요.'}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
