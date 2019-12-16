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
        eventTitle: {
          invalid: boolean('eventTitle', false),
          onChange: action('eventTitle onChange'),
        },
        eventDate: {
          invalid: boolean('eventDate', false),
          onChange: action('eventDate onChange'),
        },
        eventPlace: {
          invalid: boolean('eventPlace', false),
          onChange: action('eventPlace onChange'),
        },
        eventAddress: {
          invalid: boolean('eventAddress', false),
          onChange: action('eventAddress onChange'),
        },
        eventPlaceDesc: {
          invalid: boolean('eventPlaceDesc', false),
          onChange: action('eventPlaceDesc onChange'),
        },
        eventMainImg: {
          invalid: boolean('eventMainImg', false),
          onChange: action('eventMainImg onChange'),
        },
        eventDesc: {
          invalid: boolean('eventDesc', false),
          onChange: action('eventDesc onChange'),
        },
        ticketName: {
          invalid: boolean('ticketName', false),
          onChange: action('ticketName onChange'),
        },
        ticketDesc: {
          invalid: boolean('ticketDesc', false),
          onChange: action('ticketDesc onChange'),
        },
        ticketPrice: {
          invalid: boolean('ticketPrice', false),
          onChange: action('ticketPrice onChange'),
        },
        ticketQuantity: {
          invalid: boolean('ticketQuantity', false),
          onChange: action('ticketQuantity onChange'),
        },
        ticketIsPublicLeftCnt: {
          invalid: boolean('ticketIsPublicLeftCnt', false),
          onClick: action('ticketIsPublicLeftCnt onClick'),
        },
        ticketMaxCntPerPerson: {
          invalid: boolean('ticketMaxCntPerPerson', false),
          onChange: action('ticketMaxCntPerPerson onChange'),
        },
        ticketSalesDate: {
          invalid: boolean('ticketSalesDate', false),
          onChange: action('ticketSalesDate onChange'),
        },
        ticketRefundDate: {
          invalid: boolean('ticketRefundDate', false),
          onChange: action('ticketRefundDate onChange'),
        },
      }}
      Button={{
        onClick: action('createBtn onClick'),
      }}
    />
  );
};
