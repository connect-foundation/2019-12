import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0rem;
  text-align: left;
  flex-grow: 1;
  color: ${palette('grayscale', 1)};
`;

export const HeaderWrapper = styled.div`
  margin: 1rem 0rem;
  ${theme('fontStyle.h4')}
`;

export const TotalContainer = styled.div`
  ${theme('fontStyle.h6')};
  display: flex;
  flex-direction: row;
  margin: 3rem 0;
`;

export const Label = styled.span`
  margin-right: 3rem;
`;

export const TotalPriceWrapper = styled.span`
  font-weight: bold;
`;

export const PurchaseBtnWrapper = styled.div`
  display: flex;
  margin-top: 5rem;

  button {
    ${theme('fontStyle.h6')}
    font-weight: bold;
    height: 5rem;
  }
`;
