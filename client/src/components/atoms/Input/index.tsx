import React from 'react';
import * as S from './style';

export interface Props {
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
  value?: string | number;
  /** onChange handler(setState) */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** onFocusOut handler */
  onFocusOut?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({ inputName, ...props }: Props): React.ReactElement {
  return <S.Input name={inputName} {...props} autoComplete="off" />;
}

export default Input;
