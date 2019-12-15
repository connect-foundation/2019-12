import styled from 'styled-components';
import { theme } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0rem;
  text-align: left;
  flex-grow: 1;
`;

export const HeaderWrapper = styled.div`
  margin: 1rem 0rem;
  ${theme('fontStyle.h4')}
`;

export const TicketWrapper = styled.div`
  margin: 1rem 0rem;
`;

export const CouterWrapper = styled.div`
  margin-bottom: 5rem;
`;
