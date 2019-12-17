import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useCookies } from 'react-cookie';
import defaultTheme from 'commons/style/themes/default';
import Normalize from 'commons/style/Normalize';
import GlobalStyles from 'commons/style/GlobalStyle';
import {
  Login,
  SignUp,
  Main,
  EventDetail,
  EventCreate,
  EventJoin,
  MyPage,
  NotFound,
} from 'pages';
import GlobalStoreProvider from 'stores';
import { UserAccountState, UserAccountAction } from 'stores/accountStore';

const { REACT_APP_TEST_UID_TOKEN } = process.env;

const App: React.FC = () => {
  return (
    <GlobalStoreProvider>
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute exact path="/event/create" component={EventCreate} />
            <Route
              exact
              path="/events/:eventId([0-9]+)"
              component={EventDetail}
            />
            <PrivateRoute
              path="/events/:eventId([0-9]+)/register/tickets"
              component={EventJoin}
            />
            <PrivateRoute
              path="/my/:templateName(tickets|events)"
              component={MyPage}
            />

            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </GlobalStoreProvider>
  );
};

export default App;

function PrivateRoute({
  component: TargetPage,
  ...rest
}: any): React.ReactElement {
  const [cookies] = useCookies(['UID']);
  const { isLogin } = useContext(UserAccountState);
  const { setLoginState } = useContext(UserAccountAction);

  useEffect(() => {
    setLoginState(true);
  }, [setLoginState]);

  if (cookies.UID === `${REACT_APP_TEST_UID_TOKEN}`) {
    return (
      <Route {...rest} render={(props: any) => <TargetPage {...props} />} />
    );
  }

  return (
    <Route
      {...rest}
      render={(props: any) =>
        cookies.UID && isLogin ? (
          <TargetPage {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
