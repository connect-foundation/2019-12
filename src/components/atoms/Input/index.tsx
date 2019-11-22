import React from 'react';
import * as S from './style';

interface Props {
  /** name of input */
  inputName: string;
  /** is invalid? */
  invalid?: boolean;
  /** is disabled */
  disabled?: boolean;
  /** defaultValue of input */
  defaultValue?: string;
  /** placeholder content */
  placeholder?: string;
  /** input value(state) */
  value?: string;
  /** onChange handler(setState) */
  onChange?: (e: any) => void;
}

function Input({ inputName, ...props }: Props): React.ReactElement {
  return <S.Input name={inputName} {...props} />;
}

export default Input;
