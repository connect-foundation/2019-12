import styled, { css } from 'styled-components';
import ImgBtn from 'components/molecules/ImgBtn';

const commonStyle = css`
  max-width: 100%;
  padding: 0 2rem;

  @media screen and (min-width: 64rem) {
    width: 100%;
    max-width: 1060px;
    margin: auto;
    padding: 0 2.4rem;
  }
`;

export const ChildrenWrapper = styled.div`
  ${commonStyle}
  padding: 0;
  min-height: 70vh;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 9vh;
  max-height: 10rem;
  ${commonStyle}
`;

export const FooterWrapper = styled.div`
  ${commonStyle}
  height: 21vh;
  max-height: 20rem;
`;

export const InternalServerError = styled(ImgBtn)`
  min-height: inherit;
  height: 100%;
  width: 100%;
  margin: 0;
  object-fit: contain;
`;
