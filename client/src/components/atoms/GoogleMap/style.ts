import styled from 'styled-components';

import { Icon } from 'components';

export const Container = styled.div`
  width: 100%;
  height: 28rem;

  @media screen and (min-width: 64rem) {
    height: 40rem;
  }
`;

export const PinIcon = styled(Icon)`
  transform: 'translate(-50%, -50%)';
`;
