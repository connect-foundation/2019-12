import React from 'react';

import LNBItem from '.';

export default {
  title: 'Atoms / LNBItem',
};

export const index: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <LNBItem children={'내 티켓'} />
    </div>
  );
};
