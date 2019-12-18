import styled, { css } from 'styled-components';
import { palette, theme, ifProp } from 'styled-tools';
import { fadeIn, fadeOut } from 'commons/style/animations';

const flexColumnStyle = css`
  display: flex;
  flex-direction: column;
`;

export const LabelWrapper = styled.div`
  margin-bottom: 1rem;
  label {
    ${theme('fontStyle.body1')};
  }
`;

export const DateTimePickerContainer = styled.div`
  ${flexColumnStyle}
`;
export const PickerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const DatePickerWrapper = styled.div`
  width: 45%;
  .SingleDatePicker,
  .SingleDatePickerInput,
  .DateInput {
    width: 100%;
    ${theme('fontStyle.body1')}
    color: ${palette('grayscale', 2)};
  }
  .SingleDatePickerInput__withBorder {
    border-color: ${palette('grayscale', 4)};
  }
`;
export const TimePickerWrapper = styled.div`
  width: 45%;
  select {
    ${theme('fontStyle.body1')}
    color: ${palette('grayscale', 2)};
    border-color: ${palette('grayscale', 4)};
  }
`;

export const FirstDateContainer = styled.div`
  ${flexColumnStyle}
  margin-bottom: 2rem;
`;
export const SecondDateContainer = styled.div`
  ${flexColumnStyle}
`;

interface Props {
  invalid: boolean;
}
export const Caption = styled.div<Props>`
  ${theme('fontStyle.caption')}
  color: ${palette('primary')};
  margin-top: 0.8rem;
  visibility: hidden;
  animation: ${ifProp('invalid', fadeIn, fadeOut)} 0.5s forwards;
`;
