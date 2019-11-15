import styled from 'styled-components';
import Btn from '../../atoms/Btn';

export const SignUpBtn = styled(Btn)`
  background-color: blue;
  margin-top: 20px;
  color: red;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const RowContainer = styled.div`
  flex: 1;
`;
export const RowColContainer = styled(RowContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    flex: 1;
  }
`;
