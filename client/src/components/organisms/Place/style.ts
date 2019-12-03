import styled from 'styled-components';
import { theme } from 'styled-tools';

export const PlaceDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const PlcaeLabel = styled.div`
  margin-top: 3rem;
  ${theme('fontStyle.subtitle1')}
`;

export const PlaceName = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  ${theme('fontStyle.h6')}
`;

export const PlaceDetail = styled.div`
  ${theme('fontStyle.body1')};
  margin-bottom: 2rem;
`;
