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
  padding: ${switchProp('imgPosition', {
    top: '2rem',
    left: '0rem',
  })};
  border-width: ${ifProp('border', '0.25px', '0')};
  border-style: solid;
  border-color: ${ifProp('border', palette('grayscale', 5), '')};
`;

interface ContainerWrapperProps {
  imgPosition: 'top' | 'left';
}

export const Container = styled.div<ContainerWrapperProps>`
  display: flex;
  width: 50%;
  flex-direction: column;
  color: ${palette('grayscale', 1)};
  margin-bottom: 5rem;
  padding: ${switchProp('imgPosition', {
    top: '0rem',
    left: '2rem 2rem 0rem 0rem',
  })};
`;

interface ImgProp {
  src: string;
}

interface ImgWrapperProps {
  imgPosition: 'top' | 'left';
}

export const ImgWrapper = styled.div<ImgWrapperProps>`
  display: flex;
  flex-grow: 1;
  padding: ${switchProp('imgPosition', {
    top: '2rem 0rem',
    left: '0.1rem',
  })};
  padding-right: ${switchProp('imgPosition', {
    top: '0rem',
    left: '4rem',
  })};
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
  padding-top: 3rem;
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
  margin-top: 1rem;
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
