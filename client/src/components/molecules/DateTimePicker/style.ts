import styled, { css } from 'styled-components';
import { palette, theme } from 'styled-tools';

const flexColumnStyle = css`
  display: flex;
  flex-direction: column;
`;
export const LabelWrapper = styled.div`
  margin-bottom: 1rem;
`;
interface Props {
  invalid: boolean;
}
export const DateTimePickerContainer = styled.div<Props>`
  ${flexColumnStyle}
  ${props =>
    props.invalid &&
    `
    border: 1px solid '${palette('primary')}';
  `}
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
`;
export const TimePickerWrapper = styled.div`
  width: 45%;
  select {
    ${theme('fontStyle.body1')}
    color: ${palette('grayscale', 2)};
  }
`;

export const FirstDateContainer = styled.div`
  ${flexColumnStyle}
  margin-bottom: 2rem;
`;
export const SecondDateContainer = styled.div`
  ${flexColumnStyle}
`;
