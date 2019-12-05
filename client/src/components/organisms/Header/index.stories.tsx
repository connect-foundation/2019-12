import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '.';

export default {
  title: 'Organisms / Header',
};

export const index: React.FC = () => (
  <>
    <Router>
      <Switch>
        <Route path="*">
          <Header />
        </Route>
      </Switch>
    </Router>
  </>
);
