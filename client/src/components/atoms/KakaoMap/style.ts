import styled from 'styled-components';
import { prop } from 'styled-tools';

interface ContainerProps {
  height: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 28rem;
  border-radius: 0.3rem;

  @media screen and (min-width: 64rem) {
    height: ${prop('height')};
  }
`;
