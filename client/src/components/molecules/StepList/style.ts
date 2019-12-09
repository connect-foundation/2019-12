import styled, { css } from 'styled-components';
import { theme, ifProp, palette } from 'styled-tools';

const StepText = css`
  ${theme('fontStyle.subtitle2')};
  font-weight: bold;
  color: ${ifProp(
    'highlight',
    palette('grayscale', 1),
    palette('grayscale', 3),
  )};
`;

interface StepProps {
  highlight?: boolean;
}

export const Step = styled.span<StepProps>`
  ${StepText};
`;

export const StepArrow = styled.span<StepProps>`
  ${StepText};
  padding: 0rem 2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
