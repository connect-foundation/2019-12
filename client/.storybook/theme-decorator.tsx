import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/commons/style/themes/default';
import Normalize from '../src/commons/style/Normalize';
import GlobalStyles from '../src/commons/style/GlobalStyle';

export default story => (
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyles />
    {story()}
  </ThemeProvider>
);
