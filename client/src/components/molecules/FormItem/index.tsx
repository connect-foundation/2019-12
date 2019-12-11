import React from 'react';
import * as S from './style';
import { Label } from 'components';

export interface Props {
  label: string;
  labelExplanation?: string;
  invalid?: boolean;
  required?: boolean;
  captionContent?: string;
  direction?: string;
  children: React.ReactNode;
}

function FormInput({
  label,
  labelExplanation = '',
  invalid = false,
  required = false,
  captionContent = '',
  direction = 'row',
  children,
}: Props): React.ReactElement {
  return (
    <S.FormItemContainer direction={direction}>
      <S.LabelContainer>
        <S.LabelWrapper>
          <Label name={label} required={required} />
        </S.LabelWrapper>
        <S.LabelExplanation>{labelExplanation}</S.LabelExplanation>
      </S.LabelContainer>
      <S.ItemContainer>
        <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
        <S.ItemCaption invalid={invalid}>{captionContent}</S.ItemCaption>
      </S.ItemContainer>
    </S.FormItemContainer>
  );
}

export default FormInput;
