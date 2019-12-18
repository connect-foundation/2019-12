import styled from 'styled-components';
import { palette } from 'styled-tools';

export const CreateTicketFormContainer = styled.div`
  & > div {
    margin-bottom: 4rem;
  }
  width: 100%;
  padding: 3rem;
  margin-bottom: 4rem;
  border-radius: 0.3rem;
  background-color: ${palette('grayscale', 6)};
`;
