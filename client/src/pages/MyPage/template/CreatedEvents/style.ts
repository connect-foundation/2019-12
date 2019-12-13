import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Title = styled.div`
  margin-top: 5rem;
  ${theme('fontStyle.h4')};
  color: ${palette('grayscale', 2)};
  font-weight: bold;
`;

export const CardGridWrapper = styled.div`
  margin-top: 3rem;
`;
