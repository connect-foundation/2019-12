import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const NameSpan = styled.span`
  font-size: 1em;
  font-weight: bold;
  color: ${palette('grayscale', 3)};
`;

export const AsteriskSpan = styled.span`
  color: #ff2d54;
`;
