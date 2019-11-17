import React from 'react';
import { ThemeProvider } from 'styled-components';

import './App.css';
import defaultTheme from './commons/style/themes/default';
import Normalize from './commons/style/Normalize';
import GlobalStyles from './commons/style/GlobalStyle';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyles />
    <div className="App">
      <div className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        Learn React
        </a>
      </div>
    </div>
  </ThemeProvider>
);

export default App;
