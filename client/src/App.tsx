import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import defaultTheme from './commons/style/themes/default';
import Normalize from './commons/style/Normalize';
import GlobalStyles from './commons/style/GlobalStyle';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyles />
    <Router>
      <Switch>
        <Route path="*">
          <div>404 page</div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
