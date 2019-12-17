import React from 'react';
import * as S from './style';
import {
  ChkBox,
  FormItem,
  Input,
  InputOnlyNumber,
  DateTimePicker,
} from 'components';
import {
  TICKET_FORM_NAME,
  TICKET_FORM_NAME_LABEL,
  TICKET_FORM_NAME_CAPTION,
  TICKET_FORM_NAME_PLACEHOLDER,
  TICKET_FORM_DESC,
  TICKET_FORM_DESC_LABEL,
  TICKET_FORM_DESC_CAPTION,
  TICKET_FORM_DESC_PLACEHOLDER,
  TICKET_FORM_PRICE,
  TICKET_FORM_PRICE_LABEL,
  TICKET_FORM_PRICE_CAPTION,
  TICKET_FORM_QUANTITY,
  TICKET_FORM_QUANTITY_LABEL,
  TICKET_FORM_QUANTITY_CAPTION,
  TICKET_FORM_IS_PUBLIC_LEFT_CNT,
  TICKET_FORM_IS_PUBLIC_LEFT_CNT_LABEL,
  TICKET_FORM_MAX_CNT_PER_PERSON,
  TICKET_FORM_MAX_CNT_PER_PERSON_LABEL,
  TICKET_FORM_MAX_CNT_PER_PERSON_CAPTION,
  TICKET_FORM_SALES_DATE,
  TICKET_FORM_SALES_DATE_LABEL,
  TICKET_FORM_SALES_DATE_CAPTION,
  TICKET_FORM_REFUND_DATE,
  TICKET_FORM_REFUND_DATE_LABEL,
  TICKET_FORM_REFUND_DATE_CAPTION,
} from 'commons/constants/string';
interface ChangableProps {
  invalid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface Props {
  FormInputs: {
    name: ChangableProps;
    desc: ChangableProps;
    price: {
      invalid?: boolean;
      handleOnChange?: (value: string) => void;
    };
    quantity: {
      invalid?: boolean;
      handleOnChange?: (value: string) => void;
    };
    isPublicLeftCnt: {
      invalid?: boolean;
      onClick: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        isChecked?: boolean,
      ) => void;
    };
    maxCntPerPerson: {
      invalid?: boolean;
      handleOnChange?: (value: string) => void;
    };
    salesDate: {
      invalid?: boolean;
      handleOnChange?: ({
        startAt,
        endAt,
        valid,
      }: {
        startAt: string;
        endAt?: string;
        valid: boolean;
      }) => void;
    };
    refundDate: {
      invalid?: boolean;
      handleOnChange?: ({
        startAt,
        endAt,
        valid,
      }: {
        startAt: string;
        endAt?: string;
        valid: boolean;
      }) => void;
    };
  };
}
function CreateTicketForm({ FormInputs }: Props): React.ReactElement {
  return (
    <S.CreateTicketFormContainer>
      <FormItem
        label={TICKET_FORM_NAME}
        labelExplanation={TICKET_FORM_NAME_LABEL}
        captionContent={TICKET_FORM_NAME_CAPTION}
      >
        <Input
          inputName="ticketName"
          placeholder={TICKET_FORM_NAME_PLACEHOLDER}
          {...FormInputs.name}
        />
      </FormItem>
      <FormItem
        label={TICKET_FORM_DESC}
        labelExplanation={TICKET_FORM_DESC_LABEL}
        captionContent={TICKET_FORM_DESC_CAPTION}
      >
        <Input
          inputName="ticketDesc"
          placeholder={TICKET_FORM_DESC_PLACEHOLDER}
          {...FormInputs.desc}
        />
      </FormItem>
      <FormItem
        label={TICKET_FORM_PRICE}
        labelExplanation={TICKET_FORM_PRICE_LABEL}
        captionContent={TICKET_FORM_PRICE_CAPTION}
      >
        <InputOnlyNumber
          inputName="ticketPrice"
          prefix="₩"
          {...FormInputs.price}
        />
      </FormItem>
      <FormItem
        label={TICKET_FORM_QUANTITY}
        labelExplanation={TICKET_FORM_QUANTITY_LABEL}
        captionContent={TICKET_FORM_QUANTITY_CAPTION}
      >
        <InputOnlyNumber inputName="ticketQuantity" {...FormInputs.quantity} />
      </FormItem>
      <FormItem
        label={TICKET_FORM_IS_PUBLIC_LEFT_CNT}
        labelExplanation={TICKET_FORM_IS_PUBLIC_LEFT_CNT_LABEL}
      >
        <ChkBox checked={false} {...FormInputs.isPublicLeftCnt} />
      </FormItem>
      <FormItem
        label={TICKET_FORM_MAX_CNT_PER_PERSON}
        labelExplanation={TICKET_FORM_MAX_CNT_PER_PERSON_LABEL}
        captionContent={TICKET_FORM_MAX_CNT_PER_PERSON_CAPTION}
      >
        <InputOnlyNumber
          inputName="ticketMaxCntPerPerson"
          {...FormInputs.maxCntPerPerson}
        />
      </FormItem>
      <FormItem
        label={TICKET_FORM_SALES_DATE}
        labelExplanation={TICKET_FORM_SALES_DATE_LABEL}
        captionContent={TICKET_FORM_SALES_DATE_CAPTION}
      >
        <DateTimePicker
          range={true}
          firstLabelName="시작"
          secondLabelName="종료"
          {...FormInputs.salesDate}
        />
      </FormItem>
      <FormItem
        label={TICKET_FORM_REFUND_DATE}
        labelExplanation={TICKET_FORM_REFUND_DATE_LABEL}
        captionContent={TICKET_FORM_REFUND_DATE_CAPTION}
      >
        <DateTimePicker
          range={false}
          firstLabelName="환불 마감일"
          {...FormInputs.refundDate}
        />
      </FormItem>
    </S.CreateTicketFormContainer>
  );
}

export default CreateTicketForm;
