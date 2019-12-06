import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 5.6rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  img {
    width: 60rem;
  }
`;

export const TicketWrapper = styled.div`
  width: 31rem;
  flex-shrink: 0;
`;

export const PlaceWrapper = styled.div`
  margin-top: 10rem;
`;
