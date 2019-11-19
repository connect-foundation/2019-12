import styled from 'styled-components';
import { palette } from 'styled-tools';

interface DividerProps {
  borderWidth: string;
  type: 'solid' | 'dotted' | string;
  grayScaleLevel: number;
}

export const Divider = styled.hr<DividerProps>`
  border-width: ${p => p.borderWidth};
  border-style: ${p => p.type};
  border-color: ${p => palette('grayscale', p.grayScaleLevel)};
`;
