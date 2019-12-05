import styled from 'styled-components';
import { palette } from 'styled-tools';

import Button from '../../atoms/Btn';
import Image from '../../atoms/Img';

export const Btn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background: none;
  margin: auto;
  padding: 0;
`;

export const Img = styled(Image)`
  &:hover {
    opacity: ${palette('opacityscale', 1)};
    transition: opacity 1s;
  }
`;
