import React from 'react';
import * as S from './style';
import { ChkBox, FormItem, Input, TuiEditor, SearchMap } from 'components';

import {
  EVENT_FORM_FORM_IS_PUBLIC,
  EVENT_FORM_FORM_IS_PUBLIC_LABEL,
  EVENT_FORM_TITLE,
  EVENT_FORM_TITLE_LABEL,
  EVENT_FORM_TITLE_CAPTION,
  EVENT_FORM_TITLE_PLACEHOLDER,
  EVENT_FORM_DATE,
  EVENT_FORM_DATE_LABEL,
  EVENT_FORM_PLACE,
  EVENT_FORM_PLACE_LABEL,
  EVENT_FORM_PLACE_CAPTION,
  EVENT_FORM_PLACE_PLACEHOLDER,
  EVENT_FORM_PLACE_DESC,
  EVENT_FORM_PLACE_DESC_LABEL,
  EVENT_FORM_PLACE_DESC_PLACEHOLDER,
  EVENT_FORM_ADDRESS,
  EVENT_FORM_ADDRESS_LABEL,
  EVENT_FORM_ADDRESS_CAPTION,
  EVENT_FORM_MAIN_IMG,
  EVENT_FORM_MAIN_IMG_LABEL,
  EVENT_FORM_DESC,
  EVENT_FORM_DESC_LABEL,
  EVENT_FORM_DESC_CAPTION,
} from 'commons/constants/string';
interface ChangableProps {
  invalid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
interface ClickableProps {
  invalid?: boolean;
  onClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isChecked?: boolean,
  ) => void;
}

export interface Props {
  FormInputs: {
    isPublic: ClickableProps;
    title: ChangableProps;
    date: ChangableProps;
    place: ChangableProps;
    address: ChangableProps;
    placeDesc: ChangableProps;
    mainImg: ChangableProps;
    desc: ChangableProps;
  };
}

function CreateEventForm({ FormInputs }: Props): React.ReactElement {
  return (
    <S.CreateEventFormContainer>
      <FormItem
        label={EVENT_FORM_FORM_IS_PUBLIC}
        labelExplanation={EVENT_FORM_FORM_IS_PUBLIC_LABEL}
      >
        <ChkBox checked={false} {...FormInputs.isPublic} />
      </FormItem>
      <FormItem
        label={EVENT_FORM_TITLE}
        labelExplanation={EVENT_FORM_TITLE_LABEL}
        captionContent={EVENT_FORM_TITLE_CAPTION}
      >
        <Input
          inputName="eventTitle"
          placeholder={EVENT_FORM_TITLE_PLACEHOLDER}
          {...FormInputs.title}
        />
      </FormItem>
      <FormItem
        label={EVENT_FORM_DATE}
        labelExplanation={EVENT_FORM_DATE_LABEL}
      >
        <Input inputName="eventDate" {...FormInputs.date} />
      </FormItem>
      <FormItem
        label={EVENT_FORM_PLACE}
        labelExplanation={EVENT_FORM_PLACE_LABEL}
        captionContent={EVENT_FORM_PLACE_CAPTION}
      >
        <Input
          inputName="eventPlace"
          placeholder={EVENT_FORM_PLACE_PLACEHOLDER}
          {...FormInputs.place}
        />
      </FormItem>
      <FormItem
        label={EVENT_FORM_PLACE_DESC}
        labelExplanation={EVENT_FORM_PLACE_DESC_LABEL}
      >
        <Input
          inputName="eventPlaceDesc"
          placeholder={EVENT_FORM_PLACE_DESC_PLACEHOLDER}
          {...FormInputs.placeDesc}
        />
      </FormItem>
      {/* <FormItem
        label={EVENT_FORM_ADDRESS}
        labelExplanation={EVENT_FORM_ADDRESS_LABEL}
        captionContent={EVENT_FORM_ADDRESS_CAPTION}
      >
        <SearchMap {...FormInputs.address} />
      </FormItem> */}
      <FormItem
        label={EVENT_FORM_MAIN_IMG}
        labelExplanation={EVENT_FORM_MAIN_IMG_LABEL}
      >
        <Input inputName="eventMainImg" {...FormInputs.mainImg} />
      </FormItem>
      {/* <FormItem
        label={EVENT_FORM_DESC}
        labelExplanation={EVENT_FORM_DESC_LABEL}
        captionContent={EVENT_FORM_DESC_CAPTION}
        direction="column"
      >
        <TuiEditor {...FormInputs.desc} />
      </FormItem> */}
    </S.CreateEventFormContainer>
  );
}

export default CreateEventForm;
