import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 16rem;
`;

export const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 4rem;
  height: 4rem;
  background-color: ${palette('grayscale', 3)};
  user-select: none;
`;

export const Count = styled.div`
  width: 100%;
  height: 4rem;
  line-height: 3.5rem;
  text-align: center;
  font-size: 15px;
  color: rgb(74, 74, 74);
  border-radius: 0px;
  border-width: 1px 1px;
  border-style: solid none;
  border-color: rgb(200, 200, 200) rgb(200, 200, 200);
  border-image: initial;
  border-left: none;
  border-right: none;
`;
