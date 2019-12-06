import React from 'react';

import Counter from '.';

export default {
  title: 'Molecules / Counter',
};

export const index: React.FC = () => <Counter minCount={0} maxCount={10} />;
