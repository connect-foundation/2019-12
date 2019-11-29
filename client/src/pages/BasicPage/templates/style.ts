import styled, { css } from 'styled-components';

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
export const Container = styled.div``;

export const ChildrenWrapper = styled.div`
  ${commonStyle}
  padding: 0;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 6.8rem;
  ${commonStyle}
`;

export const FooterWrapper = styled.div`
  height: 6.8rem;
  ${commonStyle}
`;
