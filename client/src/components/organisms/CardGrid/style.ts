import styled from 'styled-components';

export const CardGridContainer = styled.div`
  display: grid;
  justify-content: space-between;
  column-gap: 1%;
  row-gap: 2rem;

  @media screen and (min-width: 32rem) {
    grid-template-columns: repeat(2, 49%);
    column-gap: 1%;
    row-gap: 2rem;
  }

  @media screen and (min-width: 64rem) {
    grid-template-columns: repeat(4, 24%);
    column-gap: 1%;
  }
`;
