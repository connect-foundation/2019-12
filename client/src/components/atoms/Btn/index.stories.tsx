import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Btn from '.';

export default {
  title: 'Atoms / Btn',
};

const styleTypeS = {
  label: 'styletype',
  options: [
    'primary',
    'secondary',
    'danger',
    'alert',
    'success',
    'transparent',
    'transparent-border',
  ],
  defaultValue: 'primary',
};

export const general: React.FC = () => (
  <Btn
    styletype={select(
      styleTypeS.label,
      styleTypeS.options,
      styleTypeS.defaultValue,
    )}
    disabled={boolean('disabled', false)}
    children={text('content', 'Button')}
    onClick={action('onClick')}
  />
);

export const anchor: React.FC = () => (
  <Btn
    styletype={select(
      styleTypeS.label,
      styleTypeS.options,
      styleTypeS.defaultValue,
    )}
    disabled={boolean('disabled', false)}
    children={text('content', 'Button')}
    href={text('href', 'https://naver.com')}
    onClick={action('onClick')}
  />
);

export const link: React.FC = () => (
  <>
    <Btn
      styletype={select(
        styleTypeS.label,
        styleTypeS.options,
        styleTypeS.defaultValue,
      )}
      disabled={boolean('disabled', false)}
      children={text('content', 'Button')}
      to={text('to', '/signup')}
      onClick={action('onClick')}
    />
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
      styletype={'primary'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'secondary'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'danger'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'alert'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'success'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'transparent'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'transparent-border'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
    <Btn
      styletype={'transparent-hover'}
      disabled={boolean('disabled', false)}
      children={'Button'}
      onClick={action('onClick')}
    />
  </div>
);
