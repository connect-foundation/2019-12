import styled from 'styled-components';
import { theme, palette } from 'styled-tools';

export const Container = styled.div``;

export const SearchContainer = styled.div`
  position: relative;
`;
interface DropDownProps {
  visible: boolean;
}
export const DropDown = styled.ul<DropDownProps>`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  position: absolute;
  background-color: white;
  padding: 0;
  z-index: 999;
  width: 100%;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.2rem -0.2rem ${palette('grayscale', 3)};
`;
export const DropDownItem = styled.li`
  padding: 1.5rem 1rem;
  list-style: none;
  &:hover {
    background-color: ${palette('grayscale', 6)};
    transition: background-color 0.5s;
  }
`;
export const PlaceName = styled.div`
  ${theme('fontStyle.body2')}
  color: ${palette('grayscale', 2)};
`;
export const RoadAddressName = styled.div`
  ${theme('fontStyle.caption')}
  color: ${palette('grayscale', 3)};
`;
export const KakaoMapWrapper = styled.div`
  margin-top: 1rem;
`;
