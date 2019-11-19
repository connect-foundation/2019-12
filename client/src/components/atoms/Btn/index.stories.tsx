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

export const general: React.FC = () => (
  <Btn
    styleType={select(
      styleTypeS.label,
      styleTypeS.options,
      styleTypeS.defaultValue,
    )}
    disabled={boolean('disabled', false)}
    content={text('content', 'Button')}
    href={''}
    to={''}
    onClick={action('onClick')}
  />
);

export const anchor: React.FC = () => (
  <Btn
    styleType={select(
      styleTypeS.label,
      styleTypeS.options,
      styleTypeS.defaultValue,
    )}
    disabled={boolean('disabled', false)}
    content={text('content', 'Button')}
    href={text('href', 'https://naver.com')}
    to={''}
    onClick={action('onClick')}
  />
);

export const link: React.FC = () => (
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
            content={text('content', 'Button')}
            href={''}
            to={text('to', '/home')}
            onClick={action('onClick')}
          />
        </Route>
      </Switch>
    </Router>
  </>
);

export const allstyle: React.FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Btn
      styleType={'primary'}
      disabled={boolean('disabled', false)}
      content={'Button'}
      href={''}
      to={''}
      onClick={action('onClick')}
    />
    <Btn
      styleType={'secondary'}
      disabled={boolean('disabled', false)}
      content={'Button'}
      href={''}
      to={''}
      onClick={action('onClick')}
    />
    <Btn
      styleType={'danger'}
      disabled={boolean('disabled', false)}
      content={'Button'}
      href={''}
      to={''}
      onClick={action('onClick')}
    />
    <Btn
      styleType={'alert'}
      disabled={boolean('disabled', false)}
      content={'Button'}
      href={''}
      to={''}
      onClick={action('onClick')}
    />
    <Btn
      styleType={'success'}
      disabled={boolean('disabled', false)}
      content={'Button'}
      href={''}
      to={''}
      onClick={action('onClick')}
    />
  </div>
);
