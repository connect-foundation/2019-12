import styled from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';

interface ContainerProps {
  active: boolean;
}

export const Container = styled.div<ContainerProps>`
  ${theme('fontStyle.h6')};
  border-bottom: 0.3rem solid
    ${ifProp('active', palette('grayscale', 1), palette('white'))};
  color: ${palette('grayscale', 1)};
  padding: 2rem;
  font-weight: bold;
  transition: background-color ease 0.2s;
  user-select: none;
  cursor: pointer;
  flex: 1 1 0;
  text-align: center;

  &:hover {
    background-color: ${palette('grayscale', 6)};
  }
`;
