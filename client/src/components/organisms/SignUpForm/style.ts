import styled from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';
import { Input } from 'components';

interface Props {
  invalid?: boolean;
}
export const SignUpFormContainer = styled.div``;

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FormInput = styled(Input)`
  margin: 0.6rem 0;
`;
export const FormCaption = styled.div<Props>`
  ${theme('fontStyle.caption')}
  visibility: ${ifProp('invalid', 'unset', 'hidden')};
  color: ${palette('primary')};
`;
export const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    width: 48%;
  }
`;
export const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
`;
