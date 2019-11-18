import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Btn from '.';

storiesOf('0 - Atoms - Btn', module)
  .add('default', () => (
    <Btn
      type="button"
      disabled={boolean('disabled', false)}
      content={text('content', 'hello world')}
    />
  ))
  .add('disabled', () => (
    <Btn
      type="button"
      disabled={boolean('disabled', true)}
      content={text('content', 'hello world')}
    />
  ));
