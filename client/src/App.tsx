import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/commons/style/themes/default';
import Normalize from '../src/commons/style/Normalize';
import GlobalStyles from '../src/commons/style/GlobalStyle';

import Login from './pages/Login';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyles />
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <div>404 page</div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
