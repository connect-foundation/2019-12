import styled, { css } from 'styled-components';
import { palette } from 'styled-tools';

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
export const FirstDateContainer = styled.div`
  ${flexColumnStyle}
  margin-bottom: 2rem;
`;
export const SecondDateContainer = styled.div`
  ${flexColumnStyle}
`;
