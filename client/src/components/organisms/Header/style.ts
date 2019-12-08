import styled from 'styled-components';
import { ImgBtn } from 'components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoBtn = styled(ImgBtn)`
  height: 3rem;

  @media screen and (min-width: 64rem) {
    height: 4rem;
  }
`;
