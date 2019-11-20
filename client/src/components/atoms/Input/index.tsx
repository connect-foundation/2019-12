import React from 'react';
import * as S from './style';

interface Props {
  /** is invalid? */
  invalid?: boolean;
  /** is disabled */
  disabled?: boolean;
  defaultValue?: string;
  /** placeholder content */
  placeholder?: string;
  /** input value */
  value?: string;
  /** onChange handler */
  onChange?: () => void;
}

function Input({ ...props }: Props): React.ReactElement {
  return <S.Input {...props} />;
}

export default Input;
