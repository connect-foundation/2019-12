import React from 'react';
import Price from '.';

export default {
  title: 'Atoms / Price',
};

export const index: React.FC = () => {
  return <Price mount={16000000} separated={true} />;
};
