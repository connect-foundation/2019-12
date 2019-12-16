import React from 'react';
import * as S from './style';
import { ChkBox, FormItem, Input } from 'components';

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
    name: ChangableProps;
    desc: ChangableProps;
    price: ChangableProps;
    quantity: ChangableProps;
    isPublicLeftCnt: ClickableProps;
    maxCntPerPerson: ChangableProps;
    salesDate: ChangableProps;
    refundDate: ChangableProps;
  };
}
function CreateTicketForm({ FormInputs }: Props): React.ReactElement {
  return (
    <S.CreateTicketFormContainer>
      <FormItem
        label="티켓 이름"
        labelExplanation="한 번 설정한 이름은 수정할 수 없습니다."
      >
        <Input
          inputName="ticketName"
          placeholder="일반 입장권"
          {...FormInputs.name}
        />
      </FormItem>
      <FormItem
        label="티켓 설명"
        labelExplanation="이 티켓에 대해 상세한 설명이 필요하다면 작성해주세요."
      >
        <Input
          inputName="ticketDesc"
          placeholder="무료 음료를 제공합니다."
          {...FormInputs.desc}
        />
      </FormItem>
      <FormItem
        label="가격"
        labelExplanation="구매자가 있는 경우 티켓 가격은 수정할 수 없습니다."
      >
        <Input inputName="ticketPrice" {...FormInputs.price} />
      </FormItem>
      <FormItem
        label="티켓 수량"
        labelExplanation="판매하고 싶은 최대 수량을 정해주세요."
      >
        <Input inputName="ticketQuantity" {...FormInputs.quantity} />
      </FormItem>
      <FormItem
        label="티켓 수량 숨김"
        labelExplanation="티켓의 전체 수량과 남은 개수를 표시하지 않습니다. 판매된 개수는 항상 표시됩니다."
      >
        <ChkBox checked={false} {...FormInputs.isPublicLeftCnt} />
      </FormItem>
      <FormItem
        label="1인당 구매 가능 개수"
        labelExplanation="유저 1명이 구입할 수 있는 최대 개수입니다."
      >
        <Input
          inputName="ticketMaxCntPerPerson"
          {...FormInputs.maxCntPerPerson}
        />
      </FormItem>
      <FormItem
        label="판매 기간"
        labelExplanation="티켓별로 판매기간을 조정할 수 있습니다."
      >
        <Input inputName="ticketSalesDate" {...FormInputs.salesDate} />
      </FormItem>
      <FormItem
        label="환불 마감 날짜"
        labelExplanation="판매 종료일을 설정하면 환불 마감 날짜는 자동으로 이와 동일하게 조정되지만 호스트가 원하는 날짜로 변경할 수도 있습니다."
      >
        <Input inputName="ticketRefundDate" {...FormInputs.refundDate} />
      </FormItem>
    </S.CreateTicketFormContainer>
  );
}

export default CreateTicketForm;
