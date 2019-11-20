import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './pages/Login';

const App: React.FC = () => (
  <Router>
    <div className="App">
      <Link to="/login">Login</Link>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <div>404 page</div>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
