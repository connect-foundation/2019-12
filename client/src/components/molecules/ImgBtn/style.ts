import styled from 'styled-components';
import { palette } from 'styled-tools';

import { Btn, Img } from 'components';

export const Button = styled(Btn)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background: none;
  margin: auto;
  padding: 0;
`;

export const Image = styled(Img)`
  &:hover {
    opacity: ${palette('opacityscale', 1)};
    transition: opacity 1s;
  }
`;
