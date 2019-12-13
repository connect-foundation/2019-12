import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background-color: rgb(254, 244, 223);
  color: ${palette('grayscale', 1)};
  user-select: none;
`;

export const CountLabel = styled.span`
  ${theme('fontStyle.h6')};
  font-weight: bold;
`;

export const CountDesc = styled.span`
  ${theme('fontStyle.h6')};
  font-weight: bold;
  font-size: 1.2rem;
`;
