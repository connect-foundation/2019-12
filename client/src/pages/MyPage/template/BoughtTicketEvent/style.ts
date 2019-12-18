import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const EventHeaderWrapper = styled.div`
  margin: 5rem 0rem;
`;

export const TitleTickets = styled.div`
  margin-top: 2rem;
  ${theme('fontStyle.h5')};
  color: ${palette('grayscale', 1)};
  font-weight: bold;
`;

export const TitleTicketsCaption = styled.div`
  ${theme('fontStyle.h6')};
  color: ${palette('grayscale', 2)};
  margin-top: 0.5rem;
  margin-bottom: 3rem;
`;

export const TicketsContainer = styled.div`
  & > div {
    margin: 3rem 0rem;
  }
`;

export const ContentContainer = styled.div`
  margin: 0rem 4rem;
`;
