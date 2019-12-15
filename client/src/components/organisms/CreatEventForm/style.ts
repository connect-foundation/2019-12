import styled, { css } from 'styled-components';

const commonStyle = css`
  & > div {
    margin-bottom: 4rem;
  }
`;

export const CreateEventFormContainer = styled.div``;

export const EventContainer = styled.div`
  ${commonStyle}
`;
export const TicketContainer = styled.div`
  ${commonStyle}
`;
