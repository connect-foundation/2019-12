import styled from 'styled-components';
import { palette, theme } from 'styled-tools';
import { Link } from 'react-router-dom';

export const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: ${palette('white', 0)};
  box-shadow: ${palette('grayscale', 5)} 0px 2px 4px 0px;
  cursor: pointer;
`;

export const HeaderWrapper = styled.div``;

export const InnerContainer = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ImgDivProps {
  imgSrc: string;
}

export const ImgDiv = styled.div<ImgDivProps>`
  width: 100%;
  height: 13rem;
  background: url(${p => p.imgSrc}) center center / cover;
`;

export const Date = styled.span`
  ${theme('fontStyle.subtitle2')}
  color: ${palette('grayscale', 3)};
  line-height: 2;
`;

export const Name = styled.h3`
  ${theme('fontStyle.h5')}
  color: ${palette('grayscale', 1)};
  line-height: 1.3;
`;

export const Host = styled.span`
  ${theme('fontStyle.body2')}
  color: ${palette('grayscale', 2)};
  line-height: 2;
`;

export const Price = styled.span`
  ${theme('fontStyle.body2')}
  color: ${palette('grayscale', 1)};
`;
