import React from 'react';

import EventDate from '.';

export default {
  title: 'Atoms / EventDate',
};

export const samedate: React.FC = () => (
  <EventDate startAt={'2018-04-22T00:00:00Z'} endAt={'2018-04-22T09:00:00Z'} />
);

export const diffdate: React.FC = () => (
  <EventDate startAt={'2019-12-21T03:00:00Z'} endAt={'2019-12-22T09:00:00Z'} />
);
