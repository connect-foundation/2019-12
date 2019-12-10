import styled from 'styled-components';
import { palette } from 'styled-tools';
import { Icon } from 'components';

export const Wrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${palette('white')};
  border-radius: 0.2rem;
  border: 0.1rem solid ${palette('grayscale', 3)};

  &:hover {
    background-color: ${palette('grayscale', 6)};
  }
`;

export const ChkIcon = styled(Icon)`
  height: 1.8rem;
  user-select: none;
`;
