import React from 'react';

import * as S from './style';
import { BasedTemplate } from 'pages';
import TicektsTemplate, { Props as TicketsProps } from './Tickets';
import CreatedEventsTemplate, {
  Props as CreatedEventsProps,
} from './CreatedEvents';
import BoughtTicketEventTemplate, {
  Props as BoughtTicketEventTemplateProps,
} from './BoughtTicketEvent';
import ROUTES from 'commons/constants/routes';

interface Props {
  lnbTab: React.ReactElement;
  routePath: string;
  ticketsProps: TicketsProps;
  createdEventsProps: CreatedEventsProps;
  boughtTicketEventTemplateProps: BoughtTicketEventTemplateProps;
  isLoading?: boolean;
  isInternalError?: boolean;
}

function MyPageTemplate({
  lnbTab,
  routePath,
  ticketsProps,
  createdEventsProps,
  boughtTicketEventTemplateProps,
  isLoading,
  isInternalError,
}: Props): React.ReactElement {
  return (
    <BasedTemplate
      hasHeaderLine
      loading={isLoading}
      internalServerError={isInternalError}
    >
      {lnbTab}
      <S.Container>
        {routePath === ROUTES.MYPAGE_TICKETS && (
          <TicektsTemplate {...ticketsProps} />
        )}
        {routePath === ROUTES.MYPAGE_CREATED_EVENTS && (
          <CreatedEventsTemplate {...createdEventsProps} />
        )}
        {routePath.startsWith(`${ROUTES.MYPAGE_TICKETS_EVENT}/`) && (
          <BoughtTicketEventTemplate {...boughtTicketEventTemplateProps} />
        )}
      </S.Container>
    </BasedTemplate>
  );
}

export default MyPageTemplate;
