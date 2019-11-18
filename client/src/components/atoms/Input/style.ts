import styled from 'styled-components';

// TODO: black, gray, white를 theme color로 수정
export const Input = styled.input`
  display: block;
  height: 2em;
  width: 100%;
  padding-left: 15px;

  font-size: 1em;
  color: black;
  background-color: white;

  border: 1px solid gray;
  border-radius: 2px;

  &:focus {
    outline: none;
  }
`;
