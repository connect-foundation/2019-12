import React from 'react';
import * as S from './style';
import Label, { Props as LabelProps } from 'components/atoms/Label';

export interface Props {
  /** name of input */
  inputName: string;
  /** is invalid? */
  invalid?: boolean;
  /** is disabled */
  disabled?: boolean;
  /** default value of Input */
  defaultValue?: string;
  /** placeholder content */
  placeholder?: string;
  /** input value */
  value?: string;
  /** onChange handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** onFocusOut handler */
  onFocusOut?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** invalid할 경우 표시할 메시지 */
  captionContent?: string;
  /** Label에 들어갈 Props */
  labelProps: LabelProps;
}

function FormInput({
  captionContent,
  invalid = false,
  labelProps,
  ...props
}: Props): React.ReactElement {
  const { name } = labelProps;
  return (
    <S.FormInputContainer>
      <Label name={name} {...labelProps} />
      <S.FormInput invalid={invalid} {...props} />
      <S.FormCaption invalid={invalid} data-testid={'formcaption'}>
        {captionContent}
      </S.FormCaption>
    </S.FormInputContainer>
  );
}

export default FormInput;
