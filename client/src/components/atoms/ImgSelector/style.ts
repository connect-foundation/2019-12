import styled from 'styled-components';
import { theme, palette, prop } from 'styled-tools';

interface ContainerProps {
  background?: string;
  height?: string;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  border-radius: 1rem;
  background-color: ${palette('grayscale', 6)};
  background-image: url('${prop('background')}');
  background-size: cover;
  background-position: center;
  border: ${props => (props.background ? '0' : '0.2rem dotted gray')};
  color: ${props => (props.background ? 'transparent' : 'inherit')};
  width: 100%;
  height: ${prop('height')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Info = styled.p`
  ${theme('fontStyle.body')}
  display: block;
  line-height: 2rem;
`;

export const File = styled.input`
  display: block;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  outline: none;
`;
