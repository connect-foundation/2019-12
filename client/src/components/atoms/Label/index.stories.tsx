import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Label from '.';

storiesOf('0 - Atoms - Label', module)
  .add('default', () => (
    <Label
      required={boolean('required', false)}
      name={text('name', '이메일')}
    />
  ))
  .add('required', () => (
    <Label required={boolean('required', true)} name={text('name', '이메일')} />
  ));
