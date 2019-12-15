import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { Icon, Btn } from 'components';

export const CircleIconImg = styled(Icon)``;

interface RootWrapperProps {
  fullid: boolean;
}

export const RootWrapper = styled.div<RootWrapperProps>`
  width: ${ifProp('fullid', '100%', 'auto')};
`;

export const ContainerWrapper = styled(Btn)`
  display: inline-table;
  vertical-align: middle;
  width: ${ifProp('fullid', '100%', 'fit-content')};
  height: 100%;
  flex-grow: 1;

  ${CircleIconImg} {
    margin-right: 1rem;
  }
`;

export const Content = styled.span`
  line-height: initial;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.span`
  margin-left: 1rem;
`;
