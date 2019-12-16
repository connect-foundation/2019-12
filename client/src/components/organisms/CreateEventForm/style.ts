import styled, { css } from 'styled-components';
import { palette } from 'styled-tools';

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
  width: 100%;
  padding: 3rem;
  margin-bottom: 4rem;
  border-radius: 0.3rem;
  background-color: ${palette('grayscale', 6)};
`;
export const CreateBtnWrapper = styled.div`
  display: flex;
`;
