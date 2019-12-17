import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Loading } from 'components';
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
import { defaultAccountState } from 'stores/accountStore/reducer';

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
  const accountState = useContext(UserAccountState);
  const { setLoginState } = useContext(UserAccountAction);
  const [isLoginCheck, setIsLoginCheck] = useState(false);
  //최초에 실행되는 것을 막기 위한 상태이며, 지우면 안됩니다.
  const [blockFirst, setIsBlocked] = useState(false);

  useEffect(() => {
    setLoginState(true);
  }, [setLoginState]);

  useEffect(() => {
    if (!blockFirst) return setIsBlocked(true);
    if (defaultAccountState !== accountState) setIsLoginCheck(true);
  }, [accountState, blockFirst]);

  if (cookies.UID === `${REACT_APP_TEST_UID_TOKEN}`) {
    return (
      <Route {...rest} render={(props: any) => <TargetPage {...props} />} />
    );
  }

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return !isLoginCheck ? (
          <Loading />
        ) : accountState.isLogin ? (
          <TargetPage {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
