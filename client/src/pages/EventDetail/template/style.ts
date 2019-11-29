import styled from 'styled-components';
import { prop, theme, palette } from 'styled-tools';

import Btn from '../../../components/atoms/Btn';

export const Container = styled.div`
  margin-top: 5.6rem;
`;

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

interface BannerImgProps {
  url: string;
}
export const BannerImgWrapper = styled.div`
  width: 73rem;
  margin-right: 3rem;
`;
export const BannerImg = styled.div<BannerImgProps>`
  width: 100%;
  padding-top: 55%;
  background: url(${prop('url')}) center center / cover no-repeat;
`;

export const Title = styled.div`
  ${theme('fontStyle.h4')}
`;

export const ShortPlace = styled.div`
  ${theme('fontStyle.h6')}
  color: ${palette('grayscale', 3)};
  margin-top: 1.1rem;
  margin-bottom: 3.8rem;
`;

export const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  @media screen and (min-width: 64em) {
    width: 30rem;
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

export const HostDetailContainer = styled.div``;

export const Label = styled.div`
  ${theme('fontStyle.h6')}
  margin-bottom: 1rem;
`;

export const Date = styled.div`
  ${theme('fontStyle.subtitle1')}
`;

export const Price = styled.div`
  ${theme('fontStyle.subtitle1')}
  text-align: right;
  margin-top: 3rem;
`;

export const DateContainer = styled.div`
  margin-bottom: 2.5rem;
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
  width: 30rem;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const PlaceDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 10rem;
`;

export const TicketContainer = styled.div`
  width: 31rem;
  margin-left: 3rem;
  flex-shrink: 0;
`;

export const TicketLabel = styled.div`
  ${theme('fontStyle.h6')};
  margin-top: 5rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
`;

export const TicketContentContainer = styled.div`
  padding: 2rem 0rem;
  margin-top: 1rem;
  border-top: 2px dashed ${palette('grayscale', 4)};
  border-bottom: 2px dashed ${palette('grayscale', 4)};
`;

export const TicketContentWrapContainer = styled.div`
  padding-left: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const TicketPrice = styled.div`
  ${theme('fontStyle.h6')}
  margin: 2rem 0rem;
`;

export const TicketName = styled.div`
  ${theme('fontStyle.h6')}
  margin-bottom: 4rem;
`;

export const TicketDesc = styled.div`
  ${theme('fontStyle.subtitle2')}
  margin:  2rem 0rem;
`;

export const DescWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0rem;
`;

export const IconLabel = styled.div`
  ${theme('fontStyle.subtitle2')}
  margin-left: 1rem;
`;

export const ContentImg = styled.img``;

export const PlaceDetaionContainer = styled.div``;

export const PlcaeLabel = styled.div`
  margin-top: 3rem;
  ${theme('fontStyle.subtitle1')}
`;

export const PlaceName = styled.div`
  margin-top: 2rem;
  ${theme('fontStyle.h6')}
`;

export const PlaceDetail = styled.div`
  ${theme('fontStyle.body1')};
  margin-bottom: 2rem;
`;
