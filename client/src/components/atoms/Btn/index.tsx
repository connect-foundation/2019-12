import React from 'react';
import * as S from './style';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled: boolean;
  content: string;
}

const Btn: React.FC<Props> = ({ type, disabled, content }) => (
  <S.Btn type={type} disabled={disabled}>
    {content}
  </S.Btn>
);

export default Btn;
