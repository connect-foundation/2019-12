import React, { useContext } from 'react';
import { Btn, CreateEventForm, CreateTicketForm } from 'components';
import EventCreateTemplate from './template';
import { EventCreateAction } from './store';
import { CREATE_EVENT } from 'commons/constants/string';
import { validateEmptyAndExceedMaximumLength } from 'utils/validateInput';
import { SearchMapResult } from 'types/Data';

function EventCreateView(): React.ReactElement {
  const dispatcher = useContext(EventCreateAction);
  const CreateFormInputs = {
    isPublic: {
      onClick: (
        _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isChecked?: boolean,
      ) => {
        if (isChecked === true || isChecked === false) {
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
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
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
      onChange: () => {},
    },
    desc: {
      onChange: () => {},
    },
  };

  const CreateTicketInputs = {
    name: {
      onChange: () => {},
    },
    desc: {
      onChange: () => {},
    },
    price: {
      onChange: () => {},
    },
    quantity: {
      onChange: () => {},
    },
    isPublicLeftCnt: {
      onClick: () => {},
    },
    maxCntPerPerson: {
      onChange: () => {},
    },
    salesDate: {
      onChange: () => {},
    },
    refundDate: {
      onChange: () => {},
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
