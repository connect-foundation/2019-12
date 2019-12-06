import React from 'react';

import Place from '.';

export default {
  title: 'Organisms / Place',
};

const eventData = {
  place: '위플레이스 강남점(서울시 강남구 강남대로 340 경원빌딩 3층)',
  address: '서울시 강남구 강남대로 340',
  placeDesc: '',
  location: {
    latitude: 37.5662952,
    longitude: 126.9779451,
  },
};

export const index: React.FC = () => {
  return <Place {...eventData} />;
};
