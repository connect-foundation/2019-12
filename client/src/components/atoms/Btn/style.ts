import styled from 'styled-components';
import { ifProp, palette } from 'styled-tools';

// TODO: black, gray, white를 theme color로 수정
export const Btn = styled.button`
  padding: 0 1em;
  height: 2.5em;
  width: 100%;
  align-items: center;
  font-size: 1em;
  color: black;
  background-color: white;
  border-radius: 2px;
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  pointer-events: ${ifProp('disabled', 'none', 'auto')};

  &:hover,
  &:focus,
  &:active {
    background-color: ${palette('primary', 1)};
  }

  &:focus {
    outline: none;
  }
`;
