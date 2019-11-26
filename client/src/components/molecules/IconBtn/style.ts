import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { BtnStyle } from '../../atoms/Btn/style';
import Icon from '../../atoms/Icon';

interface ContainerProps {
  fullid: boolean;
  styletype: string;
}

export const Container = styled.div<ContainerProps>`
  ${BtnStyle}
  display: inline-table;
  vertical-align: middle;
  width: ${ifProp('fullid', '100%', 'fit-content')};
  flex-grow: 1;
`;

export const Content = styled.span``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const IconInBtn = styled(Icon)`
  margin-right: 1rem;
`;
