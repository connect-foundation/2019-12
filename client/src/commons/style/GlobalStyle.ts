import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
    margin: 0;
    font-family: 'Noto Sans KR', 'Roboto', sans-serif;
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
`;

export default GlobalStyles;
