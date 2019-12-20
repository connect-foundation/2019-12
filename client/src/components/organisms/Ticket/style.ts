import styled from 'styled-components';
import { theme, palette, ifProp } from 'styled-tools';

export const TicketLabel = styled.div`
  ${theme('fontStyle.h6')};
  margin-top: 5rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
`;

export const TicketContentContainer = styled.div`
  padding: 2rem 0rem;
  margin-top: 1rem;
  border-top: 2px dashed ${palette('grayscale', 4)};
  border-bottom: 2px dashed ${palette('grayscale', 4)};
`;

interface TicketContainerProps {
  disabled: boolean;
}

export const TicketContentWrapContainer = styled.div<TicketContainerProps>`
  color: ${ifProp(
    'disabled',
    palette('grayscale', 4),
    palette('grayscale', 1),
  )};
  padding-left: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const TicketPriceWrapper = styled.div`
  ${theme('fontStyle.h6')}
  margin-bottom: 2rem;
`;

export const TicketName = styled.div`
  ${theme('fontStyle.h6')}
  margin-bottom: 4rem;
`;

export const TicketDesc = styled.div`
  ${theme('fontStyle.subtitle2')}
  margin:  2rem 0rem;
`;
