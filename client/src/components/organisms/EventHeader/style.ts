import styled from 'styled-components';
import { prop, theme, palette } from 'styled-tools';

import { Btn } from 'components';

export const Container = styled.div``;

export const HeaderContainer = styled.div``;

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

export const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  @media screen and (min-width: 64em) {
    width: 30%;
    min-height: 40rem;
    padding-top: 1.4rem;
    flex-shrink: 0;
    flex-grow: 0;
    border-top: 0.4rem solid rgb(74, 74, 74);
  }
  padding-left: 0.4rem;
  word-break: keep-all;
  background: rgb(255, 255, 255);
`;

interface BannerImgProps {
  url: string;
}
export const BannerImgWrapper = styled.div`
  width: 70%;
  margin-right: 3rem;
`;
export const BannerImg = styled.div<BannerImgProps>`
  width: 100%;
  padding-top: 55%;
  background: url(${prop('url')}) center center / cover no-repeat;
`;

export const Title = styled.div`
  ${theme('fontStyle.h5')}
`;

export const ShortPlace = styled.div`
  ${theme('fontStyle.subtitle1')}
  color: ${palette('grayscale', 3)};
  margin-top: 1.1rem;
  margin-bottom: 3.8rem;
`;

export const HostDetailContainer = styled.div`
  button {
    cursor: auto;
  }
`;

export const DateContainer = styled.div`
  margin-bottom: 2.5rem;
`;

export const Label = styled.div`
  ${theme('fontStyle.h6')}
  margin-bottom: 1rem;
`;

export const Date = styled.div`
  ${theme('fontStyle.subtitle1')}
  white-space: pre;
`;

export const PriceWrapper = styled.div`
  ${theme('fontStyle.subtitle2')};
  color: ${palette('grayscale', 2)};
  text-align: right;
  margin: 1rem 0;
`;

export const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 0rem;
  border-top: 1px solid ${palette('grayscale', 4)};
  border-bottom: 1px solid ${palette('grayscale', 4)};
`;

export const ReservedPeopleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ReservedPeople = styled.span`
  ${theme('fontStyle.subtitle1')}
  margin-left: 1rem;
`;

export const SubmitBtn = styled(Btn)`
  width: 30%;
`;
