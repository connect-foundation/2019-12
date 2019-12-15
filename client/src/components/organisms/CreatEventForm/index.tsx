import React from 'react';
import * as S from './style';
import Btn, { Props as BtnProps } from 'components/atoms/Btn';
import FormItem, {
  Props as FormItemProps,
} from 'components/molecules/FormItem';
import { ChkBox, Input, TuiEditor, SearchMap } from 'components';

interface Test {
  invalid: boolean;
  onChange?: () => {};
  onClick?: () => {};
}

export interface Props {
  FormInputs: {
    isPublic: FormItemProps;
    eventTitle: FormItemProps;
    eventDate: FormItemProps;
    eventPlace: FormItemProps;
    eventAddress: FormItemProps;
    eventPlaceDesc: FormItemProps;
    eventMainImg: FormItemProps;
    eventDesc: FormItemProps;
    ticketName: FormItemProps;
    ticketDesc: FormItemProps;
    ticketPrice: FormItemProps;
    ticketQuantity: FormItemProps;
    ticketIsPublicLeftCnt: FormItemProps;
    ticketMaxCntPerPerson: FormItemProps;
    ticketSalesDate: FormItemProps;
    ticketRefundDate: FormItemProps;
  };
  Button: BtnProps;
}

function CreateEventForm(): React.ReactElement {
  return (
    <S.CreateEventFormContainer>
      <div className="head"></div>
      <S.EventContainer>
        <FormItem
          label="공개 여부"
          labelExplanation="이벤트를 공개하지 않으면 링크로는 이벤트를 접속할 수 있지만 BookUs의 메인 페이지에는 나타나지 않습니다. 아직 공개할 준비가 안 되어 있거나, 메인에 공개하고 싶지 않으면 체크를 해제 하세요."
        >
          <ChkBox checked={} />
        </FormItem>
        <FormItem
          label="이벤트 제목"
          labelExplanation="주제를 잘 나타내는 멋진 제목을 입력해주세요."
          captionContent="제목을 입력하세요"
        >
          <Input
            inputName="eventTitle"
            placeholder="부스트캠프 2019 데모데이"
          />
        </FormItem>
        <FormItem
          label="이벤트 날짜 및 시간"
          labelExplanation="이벤트가 진행되는 날짜와 시간을 입력해주세요."
        >
          <Input inputName="eventDate" />
        </FormItem>
        <FormItem
          label="장소"
          labelExplanation="이벤트는 어떤 장소에서 진행되나요?"
          captionContent="장소를 입력하세요"
        >
          <Input inputName="eventPlace" placeholder="패스트파이브 강남 4호점" />
        </FormItem>
        <FormItem
          label="장소 설명"
          labelExplanation="장소에 대해 안내가 필요하다면 적어주세요."
        >
          <Input
            inputName="eventPlaceDesc"
            placeholder="주차는 인근 주차장에서 가능합니다."
          />
        </FormItem>
        <FormItem
          label="상세 주소"
          labelExplanation="쉽게 찾아갈 수 있도록 정확한 주소를 입력해주세요."
          captionContent="상세 주소를 입력하세요"
        >
          <SearchMap />
        </FormItem>
        <FormItem
          label="대표 이미지"
          labelExplanation="이미지에 글자가 많으면 매력적이지 않습니다."
        >
          <Input inputName="eventPlace" />
        </FormItem>
        <FormItem
          label="내용"
          labelExplanation="행사의 상세한 내용을 알리는 글을 작성해주세요."
          direction="column"
        >
          <TuiEditor onChange={() => {}} />
        </FormItem>
      </S.EventContainer>
      <S.TicketContainer>
        <FormItem
          label="티켓 이름"
          labelExplanation="한 번 설정한 이름은 수정할 수 없습니다."
        >
          <Input inputName="ticketName" placeholder="일반 입장권" />
        </FormItem>
        <FormItem
          label="티켓 설명"
          labelExplanation="이 티켓에 대해 상세한 설명이 필요하다면 작성해주세요."
        >
          <Input inputName="ticketDesc" placeholder="무료 음료를 제공합니다." />
        </FormItem>
        <FormItem
          label="가격"
          labelExplanation="구매자가 있는 경우 티켓 가격은 수정할 수 없습니다."
        >
          <Input inputName="ticketPrice" />
        </FormItem>
        <FormItem
          label="티켓 수량"
          labelExplanation="판매하고 싶은 최대 수량을 정해주세요."
        >
          <Input inputName="ticketQuantity" />
        </FormItem>
        <FormItem
          label="티켓 수량 숨김"
          labelExplanation="티켓의 전체 수량과 남은 개수를 표시하지 않습니다. 판매된 개수는 항상 표시됩니다."
        >
          {/* ticketIsPublicLeftCnt */}
          <ChkBox checked={false} onClick={() => {}} />
        </FormItem>
        <FormItem
          label="1인당 구매 가능 개수"
          labelExplanation="유저 1명이 구입할 수 있는 최대 개수입니다."
        >
          <Input inputName="ticketMaxCntPerPerson" />
        </FormItem>
        <FormItem
          label="판매 기간"
          labelExplanation="티켓별로 판매기간을 조정할 수 있습니다."
        >
          <Input inputName="ticketSalesDate" />
        </FormItem>
        <FormItem
          label="환불 마감 날짜"
          labelExplanation="판매 종료일을 설정하면 환불 마감 날짜는 자동으로 이와 동일하게 조정되지만 호스트가 원하는 날짜로 변경할 수도 있습니다."
        >
          <Input inputName="ticketEndDate" />
        </FormItem>
      </S.TicketContainer>
      <div className="create-button"></div>
    </S.CreateEventFormContainer>
  );
}

export default CreateEventForm;
