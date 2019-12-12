import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

interface WrapperProps {
  background?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  border-radius: 5px;
  background-color: ${palette('grayscale', 6)};
  background-image: url('${props => props.background}');
  border: ${props => (props.background ? '0' : '2.5px dotted gray')};
  color: ${props => (props.background ? 'transparent' : 'inherit')};
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Info = styled.p`
  ${theme('fontStyle.body')}
  display: block;
  line-height: 2em;
`;

export const File = styled.input`
  display: block;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 200px;
  cursor: pointer;
  outline: none;
`;
