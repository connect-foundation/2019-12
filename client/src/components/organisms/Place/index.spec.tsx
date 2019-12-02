import React from 'react';
import { mount } from 'enzyme';

import Place from '.';

describe('Organisms / Place', () => {
  const eventData = {
    place: '위플레이스 강남점(서울시 강남구 강남대로 340 경원빌딩 3층)',
    address: '서울시 강남구 강남대로 340',
    placeDesc: '',
    location: {
      lat: 37.5662952,
      lng: 126.9779451,
    },
  };

  it('Rendering', () => {
    const wrapper = mount(<Place {...eventData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
