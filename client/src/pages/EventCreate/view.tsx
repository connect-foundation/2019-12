import React, { useContext } from 'react';
import { Btn, CreateEventForm, CreateTicketForm } from 'components';
import EventCreateTemplate from './template';
import { EventCreateAction, EventCreateState } from './store';
import { CREATE_EVENT } from 'commons/constants/string';
import {
  validateEmptyAndExceedMaximumLength,
  validateIsSameOrLower,
  validateIsNotEmptyString,
} from 'utils/validateInput';
import { SearchMapResult } from 'types/Data';

function EventCreateView(): React.ReactElement {
  const dispatcher = useContext(EventCreateAction);
  const CreateFormInputs = {
    isPublic: {
      onClick: (
        _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isChecked?: boolean,
      ) => {
        if (typeof isChecked === 'boolean') {
          dispatcher({
            type: 'isPublic',
            value: {
              valid: true,
              value: isChecked,
            },
          });
        }
      },
    },
    title: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatcher({
          type: 'eventTitle',
          value: {
            valid: validateEmptyAndExceedMaximumLength(value),
            value,
          },
        });
      },
    },
    date: {
      handleOnChange: ({
        startAt,
        endAt,
        valid,
      }: {
        startAt: string;
        endAt?: string;
        valid: boolean;
      }) => {
        dispatcher({
          type: 'eventDate',
          value: {
            valid,
            value: {
              startAt,
              endAt,
            },
          },
        });
      },
    },
    place: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatcher({
          type: 'eventPlace',
          value: {
            valid: validateEmptyAndExceedMaximumLength(value),
            value,
          },
        });
      },
    },
    placeDesc: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatcher({
          type: 'eventPlaceDesc',
          value: {
            valid: validateEmptyAndExceedMaximumLength(value),
            value,
          },
        });
      },
    },
    address: {
      handleOnChange: ({ address, latitude, longitude }: SearchMapResult) => {
        dispatcher({
          type: 'eventAddress',
          value: {
            valid: true,
            value: { address, latitude, longitude },
          },
        });
      },
    },
    mainImg: {
      onChange: (data?: string, file?: File) => {
        dispatcher({
          type: 'eventMainImg',
          value: {
            valid: true,
            value: { data, file },
          },
        });
      },
    },
    desc: {
      onChange: (value: string) => {
        dispatcher({
          type: 'eventDesc',
          value: {
            valid: validateIsNotEmptyString(value),
            value,
          },
        });
      },
    },
  };

  const CreateTicketInputs = {
    name: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatcher({
          type: 'ticketName',
          value: {
            valid: validateEmptyAndExceedMaximumLength(value),
            value,
          },
        });
      },
    },
    desc: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatcher({
          type: 'ticketDesc',
          value: {
            valid: validateEmptyAndExceedMaximumLength(value),
            value,
          },
        });
      },
    },
    price: {
      handleOnChange: (value: string) => {
        dispatcher({
          type: 'ticketPrice',
          value: {
            valid: validateIsNotEmptyString(value),
            value: value,
          },
        });
      },
    },
    quantity: {
      handleOnChange: (value: string) => {
        dispatcher({
          type: 'ticketQuantity',
          value: {
            valid: validateIsNotEmptyString(value),
            value: value,
          },
        });
      },
    },
    isPublicLeftCnt: {
      onClick: (
        _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isChecked?: boolean,
      ) => {
        if (isChecked === true || isChecked === false) {
          dispatcher({
            type: 'ticketIsPublicLeftCnt',
            value: {
              valid: true,
              value: isChecked,
            },
          });
        }
      },
    },
    maxCntPerPerson: {
      handleOnChange: (value: string) => {
        dispatcher({
          type: 'ticketMaxCntPerPerson',
          value: {
            valid: validateIsNotEmptyString(value),
            // && validateIsSameOrLower(+value, +ticketQuantity),
            value,
          },
        });
      },
    },
    salesDate: {
      handleOnChange: ({
        startAt,
        endAt,
        valid,
      }: {
        startAt: string;
        endAt?: string;
        valid: boolean;
      }) => {
        console.log(startAt, endAt, valid);
        dispatcher({
          type: 'ticketSalesDate',
          value: {
            valid,
            value: {
              startAt,
              endAt,
            },
          },
        });
      },
    },
    refundDate: {
      handleOnChange: ({
        startAt,
        valid,
      }: {
        startAt: string;
        valid: boolean;
      }) => {
        dispatcher({
          type: 'ticketRefundDate',
          value: {
            valid,
            value: {
              startAt,
            },
          },
        });
      },
    },
  };
  const Button = {
    children: CREATE_EVENT,
    styletype: 'primary',
    grow: true,
    onClick: () => dispatcher({ type: 'submit', value: true }),
  };
  return (
    <EventCreateTemplate
      loading={false}
      eventCreateHeader={
        <>
          이벤트 주최하기 <br />
          새로운 이벤트를 주최하기 위해선 다음 단계들이 필요해요! <br />
          이벤트를 만들면 바로 게시됩니다.
        </>
      }
      createEventForm={<CreateEventForm FormInputs={CreateFormInputs} />}
      createTicketForm={<CreateTicketForm FormInputs={CreateTicketInputs} />}
      createBtn={<Btn {...Button} />}
    />
  );
}

export default EventCreateView;
