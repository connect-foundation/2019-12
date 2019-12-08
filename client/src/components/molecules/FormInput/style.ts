import styled from 'styled-components';
import { ifProp, palette, theme } from 'styled-tools';
import Input from 'components/atoms/Input';

interface Props {
  invalid?: boolean;
}

export const FormInputContainer = styled.div`
  height: 9rem;
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
