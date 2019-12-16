import React from 'react';
import * as S from './style';
import { ChkBox, FormItem, Input, TuiEditor, SearchMap } from 'components';

import {
  EVENT_FORM_IS_PUBLIC,
  EVENT_FORM_IS_PUBLIC_LABEL,
  EVENT_TITLE,
  EVENT_TITLE_LABEL,
  EVENT_TITLE_CAPTION,
  EVENT_TITLE_PLACEHOLDER,
  EVENT_DATE,
  EVENT_DATE_LABEL,
  EVENT_PLACE,
  EVENT_PLACE_LABEL,
  EVENT_PLACE_CAPTION,
  EVENT_PLACE_PLACEHOLDER,
  EVENT_PLACE_DESC,
  EVENT_PLACE_DESC_LABEL,
  EVENT_PLACE_DESC_PLACEHOLDER,
  EVENT_ADDRESS,
  EVENT_ADDRESS_LABEL,
  EVENT_ADDRESS_CAPTION,
  EVENT_MAIN_IMG,
  EVENT_MAIN_IMG_LABEL,
  EVENT_DESC,
  EVENT_DESC_LABEL,
  EVENT_DESC_CAPTION,
} from 'commons/constants/string';
interface ChangableProps {
  invalid?: boolean;
  onChange: () => void;
}
interface ClickableProps {
  invalid?: boolean;
  onClick: () => void;
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
        label={EVENT_FORM_IS_PUBLIC}
        labelExplanation={EVENT_FORM_IS_PUBLIC_LABEL}
      >
        <ChkBox checked={false} {...FormInputs.isPublic} />
      </FormItem>
      <FormItem
        label={EVENT_TITLE}
        labelExplanation={EVENT_TITLE_LABEL}
        captionContent={EVENT_TITLE_CAPTION}
      >
        <Input
          inputName="eventTitle"
          placeholder={EVENT_TITLE_PLACEHOLDER}
          {...FormInputs.title}
        />
      </FormItem>
      <FormItem label={EVENT_DATE} labelExplanation={EVENT_DATE_LABEL}>
        <Input inputName="eventDate" {...FormInputs.date} />
      </FormItem>
      <FormItem
        label={EVENT_PLACE}
        labelExplanation={EVENT_PLACE_LABEL}
        captionContent={EVENT_PLACE_CAPTION}
      >
        <Input
          inputName="eventPlace"
          placeholder={EVENT_PLACE_PLACEHOLDER}
          {...FormInputs.place}
        />
      </FormItem>
      <FormItem
        label={EVENT_PLACE_DESC}
        labelExplanation={EVENT_PLACE_DESC_LABEL}
      >
        <Input
          inputName="eventPlaceDesc"
          placeholder={EVENT_PLACE_DESC_PLACEHOLDER}
          {...FormInputs.placeDesc}
        />
      </FormItem>
      <FormItem
        label={EVENT_ADDRESS}
        labelExplanation={EVENT_ADDRESS_LABEL}
        captionContent={EVENT_ADDRESS_CAPTION}
      >
        <SearchMap {...FormInputs.address} />
      </FormItem>
      <FormItem label={EVENT_MAIN_IMG} labelExplanation={EVENT_MAIN_IMG_LABEL}>
        <Input inputName="eventMainImg" {...FormInputs.mainImg} />
      </FormItem>
      <FormItem
        label={EVENT_DESC}
        labelExplanation={EVENT_DESC_LABEL}
        captionContent={EVENT_DESC_CAPTION}
        direction="column"
      >
        <TuiEditor {...FormInputs.desc} />
      </FormItem>
    </S.CreateEventFormContainer>
  );
}

export default CreateEventForm;
