import styled from 'styled-components';
import { theme } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0rem;
`;

export const Label = styled.div`
  ${theme('fontStyle.subtitle2')}
  margin-left: 1rem;
`;
