import styled from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';

interface Props {
  required?: boolean;
}

export const Label = styled.label<Props>`
  ${theme('fontStyle.subtitle2')}
  color: ${palette('grayscale', 1)};

  &::after {
    content: '*';
    visibility: ${ifProp('required', 'unset', 'hidden')};
    color: ${palette('primary')};
  }
`;
