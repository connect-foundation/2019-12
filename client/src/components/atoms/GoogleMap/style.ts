import styled from 'styled-components';
import { prop } from 'styled-tools';

import { Icon } from 'components';

interface ContainerProps {
  height: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 28rem;

  @media screen and (min-width: 64rem) {
    height: ${prop('height')};
  }
`;

export const PinIcon = styled(Icon)`
  transform: 'translate(-50%, -50%)';
`;
