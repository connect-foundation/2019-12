import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  padding: 2rem 0rem;
`;

export const Img = styled.img`
  height: 2.5rem;
`;

export const Info = styled.div`
  ${theme('fontStyle.caption')}
  color: ${palette('grayscale', 3)};
  padding: 2rem 0rem;
  white-space: pre;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 2;
`;
