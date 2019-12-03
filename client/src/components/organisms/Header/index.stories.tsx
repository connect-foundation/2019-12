import React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
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
