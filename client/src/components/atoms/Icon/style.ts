import styled from 'styled-components';
import { prop } from 'styled-tools';

export const Img = styled.img`
  height: ${props => props.height};
`;

export const Wrapper = styled.span`
  display: inline-block;
  border-radius: 50%;
  border-color: ${prop('circularColor')};
  border-style: solid;
  border-width: ${prop('borderWidth')};
  background-color: ${prop('circularColor')};
  width: ${prop('size')};
  height: ${prop('size')};
`;
