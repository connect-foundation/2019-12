import styled, { keyframes } from 'styled-components';
import { palette, theme } from 'styled-tools';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  0% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
`;

export const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: ${palette('white', 0)};
  box-shadow: ${palette('grayscale', 5)} 0px 2px 4px 0px;
  cursor: pointer;
  animation: ${fadeIn} 1s;
`;

export const InnerContainer = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterContainer = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  height: 13rem;
  object-fit: cover;
`;

export const Title = styled.h3`
  ${theme('fontStyle.h6')}
  color: ${palette('grayscale', 1)};
  line-height: 1.3;
`;

export const Host = styled.span`
  ${theme('fontStyle.body2')}
  color: ${palette('grayscale', 2)};
  line-height: 2;
`;

export const PriceWrapper = styled.div`
  ${theme('fontStyle.body2')}
  color: ${palette('grayscale', 0)};
  padding-bottom: 0.5rem;
`;

export const DateWrappeer = styled.div`
  ${theme('fontStyle.caption')}
  font-weight:bold;
  color: ${palette('grayscale', 3)};
  line-height: 1.5;
`;
