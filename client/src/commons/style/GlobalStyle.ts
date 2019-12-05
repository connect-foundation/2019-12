import { createGlobalStyle } from 'styled-components';
import { theme } from 'styled-tools';

const GlobalStyles = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
  @import url('https://fonts.googleapis.com/css?family=Gothic+A1|Noto+Sans+KR&display=swap');
  @font-face {
    font-family: 'S-CoreDream-8Heavy';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-8Heavy.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  * {
    margin: 0;
    font-family: 'Spoqa Han Sans', 'Noto Sans KR', 'Gothic A1', sans-serif;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html {
    font-size: 10px;
  }
  body {
    height: 100%;
  }
  a, button {
    text-decoration: none;
    cursor: pointer;
  }

  h1 {
    ${theme('fontStyle.h3')}
  }

  h2 {
    ${theme('fontStyle.h4')}
  }

  h2 {
    ${theme('fontStyle.h5')}
  }

  h3 {
    ${theme('fontStyle.subtitle1')}
  }

  h4 {
    ${theme('fontStyle.subtitle2')}
  }

  h5 {
    ${theme('fontStyle.body1')}
  }

  p {
    ${theme('fontStyle.body2')}
  }
`;

export default GlobalStyles;
