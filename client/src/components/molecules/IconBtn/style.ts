import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

import { BtnStyle } from '../../atoms/Btn/style';
import Icon from '../../atoms/Icon';

interface ContainerProps {
  fullid: boolean;
  styletype: string;
  hoveredIconSrc: any;
}

export const CircleIconImg = styled(Icon)``;

export const HoveredIconImg = styled(Icon)`
  display: none;
`;

export const IconImg = styled(Icon)``;

export const Container = styled.div<ContainerProps>`
  ${BtnStyle}
  display: inline-table;
  vertical-align: middle;
  width: ${ifProp('fullid', '100%', 'fit-content')};
  flex-grow: 1;

  ${CircleIconImg} {
    margin-right: 1rem;
  }

  ${HoveredIconImg} {
    margin-left: 1rem;
  }

  ${IconImg} {
    margin-left: 1rem;
  }

  &:hover {
    ${IconImg} {
      display: ${ifProp('hoveredIconSrc', 'none', 'inline-block')};
    }

    ${HoveredIconImg} {
      display: ${ifProp('hoveredIconSrc', 'inline-block', '')};
    }
  }
`;

export const Content = styled.span`
  line-height: initial;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
