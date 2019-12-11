import React from 'react';
import { text } from '@storybook/addon-knobs';
import TuiEditor from '.';

export default {
  title: 'Atoms / TuiEditor',
};

export const index: React.FC = () => {
  return (
    <TuiEditor
      placeholder={text('placeholder', '내용을 입력해주세요.')}
      onChange={() => {}}
    />
  );
};
