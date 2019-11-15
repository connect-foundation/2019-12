import React from 'react';
import * as S from './style';

import Label from '../../atoms/Label';
import Input from '../../atoms/Input';

interface Props {
  name: string;
  required: boolean;
}

const FormInput: React.FC<Props> = ({ name, required }) => (
  <S.Container>
    <Label name={name} required={required} />
    <Input />
  </S.Container>
);

export default FormInput;
