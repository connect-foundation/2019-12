import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Btn from '.';

export default {
  title: 'Atoms / Btn',
};

const styleTypeS = {
  label: 'styleType',
  options: ['primary', 'secondary', 'danger', 'alert', 'success'],
  defaultValue: 'primary',
};

export const index: React.FC = () => (
  <>
    <Router>
      <Switch>
        <Route path="*">
          <Btn
            styleType={select(
              styleTypeS.label,
              styleTypeS.options,
              styleTypeS.defaultValue,
            )}
            disabled={boolean('disabled', false)}
            content={text('content', '이벤트 주최하기')}
            href={text('href', '')}
            to={text('to', '')}
            onClick={action('onClick')}
          />
        </Route>
      </Switch>
    </Router>
  </>
);
