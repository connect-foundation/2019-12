import styled, { css } from 'styled-components';

const overrideTuiStyle = css`
  h1,
  h2 {
    border: 0 !important;
  }
  img {
    max-width: 100% !important;
  }
`;
export const Container = styled.div`
  margin-top: 5.6rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ViewerWrapper = styled.div`
  width: 60%;
  ${overrideTuiStyle}
`;
export const TicketWrapper = styled.div`
  width: 30%;
`;

export const PlaceWrapper = styled.div`
  margin-top: 10rem;
`;
