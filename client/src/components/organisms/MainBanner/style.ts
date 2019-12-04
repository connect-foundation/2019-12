import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

interface Props {
  imgSrc: string;
}

export const Wrapper = styled.div<Props>`
  height: 100%;
  background-image: url(${(props): string => props.imgSrc});
  background-size: cover;
  background-position: center;

  @media screen and (min-width: 64rem) {
    border-radius: 1rem;
  }
`;

export const Container = styled.div`
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2.4rem;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 64rem) {
    padding: 6rem;
    border-radius: 1rem;
  }
`;

export const Title = styled.div`
  ${theme('fontStyle.h5')};
  font-family: 'S-CoreDream-8Heavy';
  color: ${palette('white')};
  margin: 2.4rem 0;

  @media screen and (min-width: 64rem) {
    ${theme('fontStyle.h3')};
    margin: 3.7rem 0;
  }
`;
