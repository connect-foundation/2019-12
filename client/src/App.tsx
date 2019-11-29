import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../src/commons/style/themes/default';
import Normalize from '../src/commons/style/Normalize';
import GlobalStyles from '../src/commons/style/GlobalStyle';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import EventDetail from './pages/EventDetail';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <Normalize />
    <GlobalStyles />
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/events/:eventId([0-9]+)" component={EventDetail} />
        <Route path="*">
          <div>404 page</div>
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
