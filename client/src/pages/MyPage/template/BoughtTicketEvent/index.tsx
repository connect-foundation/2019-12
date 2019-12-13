import React from 'react';

import * as S from './style';

export interface Props {
  eventId: number;
}

function BoughtTicketEventTemplate({ eventId }: Props): React.ReactElement {
  return (
    <>
      <S.Title>{eventId}</S.Title>
    </>
  );
}

export default BoughtTicketEventTemplate;
