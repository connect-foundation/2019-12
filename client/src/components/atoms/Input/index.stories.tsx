import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Input from '.';

storiesOf('0 - Atoms - Input', module)
  .add('default', () => (
    <Input
      disabled={boolean('disabled', false)}
      defaultValue={text('defaultValue', 'bookus@gmail.com')}
    />
  ))
  .add('disabled', () => (
    <Input
      disabled={boolean('disabled', true)}
      defaultValue={text('defaultValue', 'bookus@gmail.com')}
    />
  ));
