import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const LogoImg = styled.img`
  height: 5rem;
`;

export const SocialLoginLabel = styled.div`
  ${theme('fontStyle.button')};
  color: ${palette('grayscale', 2)};
  line-height: 3;
`;
