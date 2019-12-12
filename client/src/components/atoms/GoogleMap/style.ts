import styled from 'styled-components';
import { prop, palette } from 'styled-tools';

import { IoMdPin } from 'react-icons/io';

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

export const PinIcon = styled(IoMdPin)`
  color: ${palette('primary')};
`;
