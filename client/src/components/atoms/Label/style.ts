import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

interface Props {
  required?: boolean;
}

export const Label = styled.label<Props>`
  ${theme('fontStyle.caption')}
  color: ${palette('grayscale', 3)};

  &::after {
    content: '${(props): string => (props.required ? '*' : '')}';
    color: #ff2d54;
  }
`;
