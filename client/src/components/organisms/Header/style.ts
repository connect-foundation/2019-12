// example
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Img = styled.img`
  height: 4.5rem;
`

export const StyledLink = styled(Link)``;
