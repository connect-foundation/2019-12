import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Page from '../templates';

export default {
  title: 'Templates / Page',
};

const content: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>페이지 내용입니다</h1>
    <h1>페이지 내용입니다</h1>
    <h1>페이지 내용입니다</h1>
  </div>
);

export const index: React.FC = () => (
  <>
    <Router>
      <Switch>
        <Route path="*">
          <Page contentComponent={content} />
        </Route>
      </Switch>
    </Router>
  </>
);
