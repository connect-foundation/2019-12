import styled from 'styled-components';

export const StepListWrapper = styled.div`
  padding: 4rem 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  padding: 0rem 2rem;
  margin-bottom: 5rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EventContainer = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
`;

export const EventSectionWrapper = styled.div`
  & > div {
    padding: 0rem;
  }
`;

export const PlaceWrapper = styled.div`
  margin-top: 3rem;
`;
