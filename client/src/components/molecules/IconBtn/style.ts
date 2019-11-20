import styled from 'styled-components';

import { BtnStyle } from '../../atoms/Btn/style';

export const Container = styled.div`
  ${BtnStyle}
  display: table;
  vertical-align: middle;
`;

export const Content = styled.span``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
