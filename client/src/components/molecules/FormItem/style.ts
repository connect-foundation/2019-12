import styled from 'styled-components';
import { palette, theme } from 'styled-tools';
import { fadeIn, fadeOut } from 'commons/style/animations';

export const FormItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const LabelWrapper = styled.div`
  label {
    ${theme('fontStyle.h6')}
  }
  margin-bottom: 0.6rem;
`;

export const LabelExplanation = styled.div`
  ${theme('fontStyle.subtitle2')}
  color: ${palette('grayscale', 2)};
`;

export const ItemContainer = styled.div`
  width: 45%;
`;

export const ChildrenWrapper = styled.div``;

interface ItemCaptionProps {
  invalid: boolean;
}
export const ItemCaption = styled.div<ItemCaptionProps>`
  ${theme('fontStyle.caption')}
  color: ${palette('primary')};
  margin-top: 0.8rem;
  visibility: hidden;
  animation: ${props => (props.invalid ? fadeIn : fadeOut)} 0.5s forwards;
`;
