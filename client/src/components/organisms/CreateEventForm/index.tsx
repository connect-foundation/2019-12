import React from 'react';
import * as S from './style';
import { ChkBox, FormItem, Input, TuiEditor, SearchMap } from 'components';

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
        label="공개 여부"
        labelExplanation="이벤트를 공개하지 않으면 링크로는 이벤트를 접속할 수 있지만 BookUs의 메인 페이지에는 나타나지 않습니다. 아직 공개할 준비가 안 되어 있거나, 메인에 공개하고 싶지 않으면 체크를 해제 하세요."
      >
        <ChkBox checked={false} />
      </FormItem>
      <FormItem
        label="이벤트 제목"
        labelExplanation="주제를 잘 나타내는 멋진 제목을 입력해주세요."
        captionContent="제목을 입력하세요"
      >
        <Input
          inputName="eventTitle"
          placeholder="부스트캠프 2019 데모데이"
          {...FormInputs.title}
        />
      </FormItem>
      <FormItem
        label="이벤트 날짜 및 시간"
        labelExplanation="이벤트가 진행되는 날짜와 시간을 입력해주세요."
      >
        <Input inputName="eventDate" {...FormInputs.date} />
      </FormItem>
      <FormItem
        label="장소"
        labelExplanation="이벤트는 어떤 장소에서 진행되나요?"
        captionContent="장소를 입력하세요"
      >
        <Input
          inputName="eventPlace"
          placeholder="패스트파이브 강남 4호점"
          {...FormInputs.place}
        />
      </FormItem>
      <FormItem
        label="장소 설명"
        labelExplanation="장소에 대해 안내가 필요하다면 적어주세요."
      >
        <Input
          inputName="eventPlaceDesc"
          placeholder="주차는 인근 주차장에서 가능합니다."
          {...FormInputs.placeDesc}
        />
      </FormItem>
      <FormItem
        label="상세 주소"
        labelExplanation="쉽게 찾아갈 수 있도록 정확한 주소를 입력해주세요."
        captionContent="상세 주소를 입력하세요"
      >
        <SearchMap {...FormInputs.address} />
      </FormItem>
      <FormItem
        label="대표 이미지"
        labelExplanation="이미지에 글자가 많으면 매력적이지 않습니다."
      >
        <Input inputName="eventMainImg" {...FormInputs.mainImg} />
      </FormItem>
      <FormItem
        label="내용"
        labelExplanation="행사의 상세한 내용을 알리는 글을 작성해주세요."
        direction="column"
      >
        <TuiEditor {...FormInputs.desc} />
      </FormItem>
    </S.CreateEventFormContainer>
  );
}

export default CreateEventForm;
