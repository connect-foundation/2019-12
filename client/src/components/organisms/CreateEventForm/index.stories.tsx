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
          invalid: boolean('eventTitle', false),
          onChange: action('eventTitle onChange'),
        },
        date: {
          invalid: boolean('eventDate', false),
          onChange: action('eventDate onChange'),
        },
        place: {
          invalid: boolean('eventPlace', false),
          onChange: action('eventPlace onChange'),
        },
        address: {
          invalid: boolean('eventAddress', false),
          handleOnChange: action('eventAddress onChange'),
        },
        placeDesc: {
          invalid: boolean('eventPlaceDesc', false),
          onChange: action('eventPlaceDesc onChange'),
        },
        mainImg: {
          invalid: boolean('eventMainImg', false),
          onChange: action('eventMainImg onChange'),
        },
        desc: {
          invalid: boolean('eventDesc', false),
          onChange: action('eventDesc onChange'),
        },
      }}
    />
  );
};
