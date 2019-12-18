import React from 'react';

import * as S from './style';

export interface Props {
  eventHeader: React.ReactNode;
  ticketsTitle: string;
  ticektsTitleCaption: string;
  ticketsList: React.ReactNode[];
}

function BoughtTicketEventTemplate({
  eventHeader,
  ticketsTitle,
  ticektsTitleCaption,
  ticketsList,
}: Props): React.ReactElement {
  return (
    <>
      <S.EventHeaderWrapper>{eventHeader}</S.EventHeaderWrapper>
      <S.ContentContainer>
        <S.TitleTickets>{ticketsTitle}</S.TitleTickets>
        <S.TitleTicketsCaption>{ticektsTitleCaption}</S.TitleTicketsCaption>
        <S.TicketsContainer>{ticketsList}</S.TicketsContainer>
      </S.ContentContainer>
    </>
  );
}

export default BoughtTicketEventTemplate;
