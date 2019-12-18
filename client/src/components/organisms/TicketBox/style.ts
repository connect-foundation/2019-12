import styled from 'styled-components';
import { theme, palette, ifProp } from 'styled-tools';

interface ContainerProps {
  checked: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3rem;
  background-color: ${ifProp(
    'checked',
    'rgb(254, 244, 223)',
    palette('grayscale', 6),
  )};
  border-radius: 0.3rem;
  color: ${palette('grayscale', 1)};
`;

export const TicketInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  ${theme('fontStyle.h6')};
  font-weight: bold;
`;

export const PriceWrapper = styled.div`
  ${theme('fontStyle.subtitle1')};
  margin: 0.5rem 0rem;
`;

export const Desc = styled.div`
  ${theme('fontStyle.body1')};
  margin: 1rem 0rem;
`;

interface OptionalContentWrapperProps {
  showOptionBtn: boolean;
}

export const OptionalContentWrapper = styled.div<OptionalContentWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: ${ifProp('showOptionBtn', '15rem', 'auto')};
`;

export const ChkBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ChkBoxDesc = styled.span`
  margin: 0 1rem;
  ${theme('fontStyle.subtitle2')};
`;

interface IconWrapperProps {
  disabledChkIcon: boolean;
}

export const IconWrapper = styled.div<IconWrapperProps>`
  cursor: ${ifProp('disabledChkIcon', 'auto', 'pointer')};
  user-select: none;
`;
