import styled from 'styled-components';
import { ifProp, palette } from 'styled-tools';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 16rem;
`;

interface ArrowWrapperProps {
  disabled?: boolean;
}

export const ArrowWrapper = styled.div<ArrowWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 5rem;
  height: 4rem;
  border-radius: 0 0.2rem 0.2rem 0;
  background-color: ${ifProp(
    'disabled',
    palette('grayscale', 5),
    palette('grayscale', 2),
  )};
  user-select: none;
  cursor: ${ifProp('disabled', 'initial', 'pointer')};
  transition: background-color ease 0.2s;

  &:hover {
    background-color: ${ifProp('disabled', '', palette('grayscale', 1))};
  }
`;

export const Count = styled.div`
  width: 100%;
  height: 4rem;
  line-height: 3.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: ${palette('grayscale', 2)};
  background-color: ${palette('white')};
  border-radius: 0;
  border-width: 0.1rem 0.1rem;
  border-style: solid none;
  border-color: ${palette('grayscale', 3)} ${palette('grayscale', 3)};
  border-image: initial;
  border-left: none;
  border-right: none;
`;
