import styled from 'styled-components';

interface Props {
  styletype: string;
}
export const TimePickerSelect = styled.select<Props>`
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  appearance: none;
  width: 100%;
  height: 100%;
  padding: 11px 11px 9px;
  background-color: white;
`;
