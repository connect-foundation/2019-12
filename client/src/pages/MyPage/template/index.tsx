import React from 'react';

import * as S from './style';
import BasedTemplate from 'pages/BasedTemplate/templates';
import TicektsTemplate, { Props as TicketsProps } from './Tickets';
import CreatedEventsTemplate, {
  Props as CreatedEventsProps,
} from './CreatedEvents';

interface Props {
  lnbTab: React.ReactElement;
  step: number;
  ticketsProps: TicketsProps;
  createdEventsProps: CreatedEventsProps;
}

const MY_TICKETS_STEP = 1;
const CREATED_EVENTS_STEP = 2;

function MyPageTemplate({
  lnbTab,
  step,
  ticketsProps,
  createdEventsProps,
}: Props): React.ReactElement {
  return (
    <BasedTemplate hasHeaderLine>
      {lnbTab}
      <S.Container>
        {step == MY_TICKETS_STEP && <TicektsTemplate {...ticketsProps} />}
        {step == CREATED_EVENTS_STEP && (
          <CreatedEventsTemplate {...createdEventsProps} />
        )}
      </S.Container>
    </BasedTemplate>
  );
}

export default MyPageTemplate;
