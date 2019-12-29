import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div`
  padding-top: 8rem;
  height: 100%;
  text-align: center;

  button {
    width: 100%;
  }
`;

export const SocialLoginWrapper = styled.div`
  text-align: left;
  width: 100%;
  ${theme('fontStyle.button')};
  color: ${palette('grayscale', 2)};
  line-height: 3;
`;

export const OauthContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  align-items: left;
  width: 30%;
  margin: 0 auto;
  padding-top: 10rem;
  justify-content: space-evenly;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  text-align: center;
  height: 5rem;

  img {
    cursor: pointer;
  }
`;

export const OAuthWrapper = styled.div`
  width: 100%;
`;
