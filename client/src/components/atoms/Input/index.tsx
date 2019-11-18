import React from 'react';
import * as S from './style';

/**
 * TODO: input component에서 여러가지 타입을 지원해줄 지 고민
 * 다른 예제에서는 input component에서 타입을 props로 받아서
 * text(default), checkbox, radio, password 등 다양하게 처리를 해주는데
 * 컴포넌트를 나눌 지 분기처리할 지에 대한 고민 필요
 */

interface Props {
  disabled: boolean;
  defaultValue: string;
}

const Input: React.FC<Props> = ({ disabled, defaultValue }) => (
  <S.Input disabled={disabled} defaultValue={defaultValue} />
);

export default Input;
