import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import CreateEventForm from '.';

export default {
  title: 'Organisms / CreateEventForm',
};

export const index: React.FC = () => {
  return (
    <CreateEventForm
      FormInputs={{
        isPublic: {
          onClick: action('isPublic onClick'),
        },
        title: {
          invalid: boolean('title', false),
          onChange: action('title onChange'),
        },
        date: {
          invalid: boolean('date', false),
          handleOnChange: action('date onChange'),
        },
        place: {
          invalid: boolean('place', false),
          onChange: action('place onChange'),
        },
        address: {
          invalid: boolean('address', false),
          handleOnChange: action('address onChange'),
        },
        placeDesc: {
          invalid: boolean('placeDesc', false),
          onChange: action('placeDesc onChange'),
        },
        mainImg: {
          invalid: boolean('mainImg', false),
          onChange: action('mainImg onChange'),
        },
        desc: {
          invalid: boolean('desc', false),
          onChange: action('desc onChange'),
        },
      }}
    />
  );
};
