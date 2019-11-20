import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div``;

export const Img = styled.img`
  height: 4.5rem;
`;

export const Info = styled.div`
  ${theme('fontStyle.caption')}
  color: ${palette('grayscale', 3)};
  padding: 2rem 0rem;
  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;
`;
