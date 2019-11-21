import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default story => (
  <Router>
    <Switch>
      <Route path="*">{story()}</Route>
    </Switch>
  </Router>
);
