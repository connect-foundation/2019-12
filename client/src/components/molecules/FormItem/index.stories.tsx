import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import FormItem from '.';
import { Input, ChkBox, TuiEditor } from 'components';

export default {
  title: 'Molecules / FormItem',
};

const directions = {
  label: 'direction',
  options: ['row', 'column'],
  defaultValue: 'row',
};

export const inputForm: React.FC = () => {
  return (
    <FormItem
      label={text('label', '이벤트 제목')}
      labelExplanation={text(
        'labelExplanation',
        '주제를 잘 나타내는 멋진 제목을 입력해주세요.',
      )}
      captionContent={text('captionContent', '제목을 입력해주세요.')}
      invalid={boolean('invalid', false)}
      required={boolean('required', false)}
      direction={select(
        directions.label,
        directions.options,
        directions.defaultValue,
      )}
    >
      <Input inputName="title" disabled={boolean('disabled', false)} />
    </FormItem>
  );
};

export const chkBoxForm: React.FC = () => {
  return (
    <FormItem
      label={text('label', '공개 여부')}
      labelExplanation={text(
        'labelExplanation',
        '이벤트 공개를 하지 않으면 링크로는 이벤트를 접속 할 수 있지만 Festa의 메인 페이지에는 나타나지 않습니다. 아직 공개 할 준비가 안 되어 있거나, 메인에 공개 하고 싶지 않으면 체크를 해제 하세요.',
      )}
      invalid={boolean('invalid', false)}
    >
      <ChkBox checked={false} />
    </FormItem>
  );
};

export const TUIEditorForm: React.FC = () => {
  return (
    <FormItem
      label={text('label', '내용')}
      labelExplanation={text(
        'labelExplanation',
        '행사의 상세한 내용을 알리는 글을 작성해주세요.',
      )}
      invalid={boolean('invalid', false)}
      direction="column"
    >
      <TuiEditor
        onChange={() => {}}
        placeholder={text('placeholder', '내용을 입력해주세요.')}
      />
    </FormItem>
  );
};
