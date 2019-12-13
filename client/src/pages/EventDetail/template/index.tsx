import React from 'react';

import * as S from './style';
import BasedTemplate from 'pages/BasedTemplate/templates';

interface Props {
  loading: boolean;
  internalServerError: boolean;
  eventHeader: React.ReactNode;
  eventContent: React.ReactNode;
  ticket: React.ReactNode;
  place: React.ReactNode;
}

function EventDetailTemplate({
  loading,
  internalServerError,
  eventHeader,
  eventContent,
  ticket,
  place,
}: Props): React.ReactElement {
  return (
    <BasedTemplate
      hasHeaderLine
      loading={loading}
      internalServerError={internalServerError}
    >
      <S.Container>
        {eventHeader}
        <S.ContentContainer>
          <S.ViewerWrapper>{eventContent}</S.ViewerWrapper>
          <S.TicketWrapper>{ticket}</S.TicketWrapper>
        </S.ContentContainer>
        <S.PlaceWrapper>{place}</S.PlaceWrapper>
      </S.Container>
    </BasedTemplate>
  );
}

export default EventDetailTemplate;
