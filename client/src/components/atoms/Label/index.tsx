import React from 'react';
import * as S from './style';

interface Props {
  name: string;
  required: boolean;
}

const Label: React.FC<Props> = ({ name, required }) => (
  <S.Container>
    <S.NameSpan>{name}</S.NameSpan>
    {required && <S.AsteriskSpan>*</S.AsteriskSpan>}
  </S.Container>
);

export default Label;
