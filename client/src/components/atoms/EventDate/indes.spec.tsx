import React from 'react';
import { mount } from 'enzyme';
import EventDate from '.';

describe('Atom / Divider', () => {
  it('[SNAPSHOT] 렌더링 (same date)', () => {
    // given
    const wrapper = mount(
      <EventDate
        startAt={'2018-04-22T00:00:00Z'}
        endAt={'2018-04-22T09:00:00Z'}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });

  it('[SNAPSHOT] 렌더링 (diff date)', () => {
    // given
    const wrapper = mount(
      <EventDate
        startAt={'2019-12-21T03:00:00Z'}
        endAt={'2019-12-22T09:00:00Z'}
      />,
    );

    // then
    expect(wrapper).toMatchSnapshot();
  });
});
