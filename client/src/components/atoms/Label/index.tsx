import React from 'react';
import * as S from './style';

interface Props {
  name: string;
  required?: boolean;
}

function Label({ name, required = false }: Props): React.ReactElement {
  return <S.Label required={required}>{name}</S.Label>;
}

export default Label;
