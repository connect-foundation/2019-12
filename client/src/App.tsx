import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
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
import { AfterLoginAction } from 'stores/afterLoginStore';
import { checkJoinEvent } from 'apis';
import { useIsMount, useApiRequest } from 'hooks';
import { SUCCESS, FAILURE } from 'hooks/useApiRequest';
import {
  RESERVE_WRONG_NUMBER,
  RESERVE_REQUIRE_LOGIN,
  RESERVE_SOLD_OUT,
  RESERVE_INVALID_DATE,
} from 'commons/constants/string';
import { NOT_OPEN, SOLD_OUT } from 'commons/constants/number';
import { NOT_FOUND, FORBIDDEN, UNAUTHORIZED, OK } from 'http-status';

const { REACT_APP_TEST_UID_TOKEN } = process.env;

const App: React.FC = () => {
  return (
    <GlobalStoreProvider>
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyles />
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Main} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={SignUp} />
            <PrivateRoute exact path="/event/create" component={EventCreate} />
            <PublicRoute
              exact
              path="/events/:eventId([0-9]+)"
              component={EventDetail}
            />
            <JoinRoute
              path="/events/:eventId([0-9]+)/register/tickets"
              component={EventJoin}
            />
            <PrivateRoute
              path="/my/:templateName(tickets|events)"
              component={MyPage}
            />

            <PublicRoute path="*" component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </GlobalStoreProvider>
  );
};

export default App;

function JoinRoute({
  component: TargetPage,
  ...rest
}: any): React.ReactElement {
  const history = useHistory();
  const isCallRequest = useRef(false);
  const [checkEvent, setCheckEvent] = useState(false);
  const [checkOpenResult, fetchCheckOpen] = useApiRequest<any>(checkJoinEvent);

  const path = window.location.pathname;
  const PATH_REGEX = /\/events\/([0-9]+)\/register\/tickets/;
  const idRegex = PATH_REGEX.exec(path);
  const ticketId = idRegex ? idRegex[1] : '';

  useEffect(() => {
    if (isCallRequest.current) return;
    fetchCheckOpen({ type: 'REQUEST', body: [ticketId, 1] });
    isCallRequest.current = true;
  }, [fetchCheckOpen, ticketId, isCallRequest]);

  useEffect(() => {
    if (checkOpenResult.type === SUCCESS || checkOpenResult.type === FAILURE) {
      setCheckEvent(true);
      if (checkOpenResult.err && checkOpenResult.err.response) {
        const { status, data } = checkOpenResult.err.response;
        const { state } = data;
        if (status === FORBIDDEN) {
          switch (state) {
            case NOT_OPEN:
              return alert(RESERVE_INVALID_DATE);
            case SOLD_OUT:
              return alert(RESERVE_SOLD_OUT);
          }
        }
        if (status === NOT_FOUND) {
          return alert(RESERVE_WRONG_NUMBER);
        }
        if (status === UNAUTHORIZED) {
          return alert(RESERVE_REQUIRE_LOGIN);
        }
      }
    }
  }, [checkOpenResult]);

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return !checkEvent ? (
          <Loading />
        ) : checkOpenResult.status === OK ? (
          <TargetPage {...props} />
        ) : (
          history.replace(`/events/${ticketId}`)
        );
      }}
    />
  );
}

function PublicRoute({ ...rest }: any): React.ReactElement {
  const { setLoginCallback } = useContext(AfterLoginAction);

  useEffect(() => {
    setLoginCallback('/');
  }, [setLoginCallback]);

  return <Route {...rest} />;
}

function PrivateRoute({
  component: TargetPage,
  ...rest
}: any): React.ReactElement {
  const [cookies] = useCookies(['UID']);
  const accountState = useContext(UserAccountState);
  const { setLoginState } = useContext(UserAccountAction);
  const [isLoginCheck, setIsLoginCheck] = useState(false);
  const { setLoginCallback } = useContext(AfterLoginAction);
  const path = window.location.pathname;

  useEffect(() => {
    setLoginState(true);
  }, [setLoginState]);

  useEffect(() => {
    if (isLoginCheck && !accountState.isLogin) setLoginCallback(path);
  }, [rest, accountState.isLogin, setLoginCallback, isLoginCheck, path]);

  useIsMount(() => {
    if (defaultAccountState !== accountState) setIsLoginCheck(true);
  }, accountState);

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
