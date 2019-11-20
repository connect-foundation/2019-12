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
          <Header
            createEventText={text('createEventText', '이벤트 주최하기')}
            userNameText={text('userNameText', 'Sungdong Jo')}
            logoLinkTo={'/home'}
            onCreateEventBtnClickHandlerick={action('onClick CreateEventBtn')}
            onUserPageBtnClickHandlerick={action('onClick UserPageBtn')}
          />
        </Route>
      </Switch>
    </Router>
  </>
);
