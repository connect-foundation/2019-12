import React from 'react';

import * as S from './style';
import BasedTemplate from 'pages/BasedTemplate/templates';

interface Props {
  loading: boolean;
  eventCreateHeader: React.ReactNode;
  createEventForm: React.ReactNode;
  createTicketForm: React.ReactNode;
  createBtn: React.ReactNode;
}

function EventCreateTemplate({
  loading,
  eventCreateHeader,
  createEventForm,
  createTicketForm,
  createBtn,
}: Props): React.ReactElement {
  return (
    <BasedTemplate hasHeaderLine loading={loading}>
      <S.EventCreateHeader>{eventCreateHeader}</S.EventCreateHeader>
      <S.CreateEventFormContainer>
        <S.EventForm>{createEventForm}</S.EventForm>
        <S.TicketForm>{createTicketForm}</S.TicketForm>
      </S.CreateEventFormContainer>
      <S.CreateBtnWrapper>{createBtn}</S.CreateBtnWrapper>
    </BasedTemplate>
  );
}

export default EventCreateTemplate;
