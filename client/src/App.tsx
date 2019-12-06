import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import defaultTheme from 'commons/style/themes/default';
import Normalize from 'commons/style/Normalize';
import GlobalStyles from 'commons/style/GlobalStyle';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Main from 'pages/Main';
import EventDetail from 'pages/EventDetail';
import EventJoin from 'pages/EventJoin';
import NotFound from 'pages/NotFound';
import GlobalStoreProvider from 'stores';

const App: React.FC = () => (
  <GlobalStoreProvider>
    <ThemeProvider theme={defaultTheme}>
      <Normalize />
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route
            exact
            path="/events/:eventId([0-9]+)"
            component={EventDetail}
          />
          <Route
            path="/events/:eventId([0-9]+)/register/tickets"
            component={EventJoin}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  </GlobalStoreProvider>
);

export default App;
