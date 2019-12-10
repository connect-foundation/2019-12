import styled from 'styled-components';
import { theme, ifProp, switchProp, prop, palette } from 'styled-tools';

interface ContainerProps {
  border: boolean;
  imgPosition: 'top' | 'left';
}

export const RootContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${switchProp('imgPosition', {
    top: 'column',
    left: 'row',
  })};
  border: ${ifProp('border', `0.1rem solid ${palette('grayscale', 4)}`, '')};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${palette('grayscale', 1)};
`;

interface ImgProp {
  src: string;
}

export const ImgWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 2rem 0rem;
`;

export const Img = styled.div<ImgProp>`
  width: 100%;
  padding-top: 55%;
  background: url(${prop('src', '')}) center center / cover no-repeat;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding-top: 2rem;
`;

export const EachContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5rem;
`;

export const Title = styled.h5`
  ${theme('fontStyle.h5')};
  font-weight: bold;
`;

export const Place = styled.span`
  ${theme('fontStyle.h6')}
  color: ${palette('grayscale', 3)};
  font-weight:bold;
`;

export const SubTitle = styled.span`
  display: block;
  ${theme('fontStyle.subtitle2')};
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Content = styled.span`
  ${theme('fontStyle.subtitle2')};
  white-space: pre;
`;
