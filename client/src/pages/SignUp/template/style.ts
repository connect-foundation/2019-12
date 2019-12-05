import styled from 'styled-components';
import { palette } from 'styled-tools';

export const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  background-color: ${palette('grayscale', 7)};
  padding: 7.5rem 0 0;

  width: 100%;
  max-width: 31rem;
  margin-left: auto;
  margin-right: auto;
`;
export const Header = styled.div`
  text-align: center;
  margin-bottom: 4.5rem;
`;
export const Content = styled.div``;
