import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0.0;
    visibility: hidden;
  }
  100% {
    opacity: 1.0;
    visibility: visible;
  }
`;
export const fadeOut = keyframes`
  0% {
    opacity: 1.0;
    visibility: visible;
  }
  100% {
    opacity: 0.0;
    visibility: hidden;
  }
`;
