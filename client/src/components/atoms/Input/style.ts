import styled from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';

interface Props {
  invalid?: boolean;
}

export const Input = styled.input<Props>`
  ${theme('fontStyle.body2')}
  height: 4rem;
  width: 100%;
  padding: 0 1rem;

  color: ${palette('grayscale', 2)};
  &::placeholder {
    color: ${palette('grayscale', 4)};
  }
  background-color: ${ifProp(
    'disabled',
    palette('grayscale', 6),
    palette('white'),
  )};

  border: 1px solid
    ${ifProp('invalid', palette('danger'), palette('grayscale', 4))};
  border-radius: 2px;

  &:focus {
    outline: none;
  }
`;
