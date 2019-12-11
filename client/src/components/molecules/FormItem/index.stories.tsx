import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import FormItem from '.';
import { Input } from 'components';

export default {
  title: 'Molecules / FormItem',
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
    >
      <Input inputName="title" disabled={boolean('disabled', false)} />
    </FormItem>
  );
};
