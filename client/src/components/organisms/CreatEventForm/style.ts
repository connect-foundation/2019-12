import styled, { css } from 'styled-components';

const commonStyle = css`
  & > div {
    margin-bottom: 4rem;
  }
`;

export const CreateEventFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EventContainer = styled.div`
  ${commonStyle}
`;
export const TicketContainer = styled.div`
  ${commonStyle}
`;
export const CreateBtnWrapper = styled.div`
  display: flex;
`;
