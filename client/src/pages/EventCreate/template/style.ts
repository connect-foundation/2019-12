import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const EventCreateHeader = styled.section`
  padding: 0 3rem;
  margin: 3rem 0 4rem 0;

  @media screen and (min-width: 64rem) {
    padding: 0rem;
    margin: 3rem 0 6rem 0;
  }

  div {
    ${theme('fontStyle.h4')}
    font-family: 'S-CoreDream-8Heavy';
    color: ${palette('grayscale', 1)};
    margin-bottom: 1rem;
  }
  p {
    ${theme('fontStyle.h6')}
    color: ${palette('grayscale', 2)};
    font-family: 'S-CoreDream-8Heavy';
  }
`;
export const EventForm = styled.section`
  padding: 3rem;

  @media screen and (min-width: 64rem) {
    padding: 0rem;
  }
`;
export const TicketForm = styled.section``;
export const CreateBtnWrapper = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;
export const CreateEventFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
