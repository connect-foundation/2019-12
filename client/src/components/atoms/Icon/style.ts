import styled from 'styled-components';
import { prop, ifProp } from 'styled-tools';

export const Img = styled.img`
  height: ${props => props.height};
  border-radius: ${ifProp('circular', '50%', '')};
`;
