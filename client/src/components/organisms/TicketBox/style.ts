import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  background-color: rgb(254, 244, 223);
  border-radius: 0.3rem;
  color: ${palette('grayscale', 1)};
`;

export const Name = styled.div`
  ${theme('fontStyle.h6')};
  font-weight: bold;
`;

export const PriceWrapper = styled.div`
  ${theme('fontStyle.subtitle1')};
  margin: 0.5rem 0rem;
`;

export const Desc = styled.div`
  ${theme('fontStyle.body1')};
  margin: 1rem 0rem;
`;
