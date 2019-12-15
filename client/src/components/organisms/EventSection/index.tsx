import React from 'react';

import * as S from './style';

export interface Props {
  /** event title */
  title: string;
  /** event subtitles */
  subtitle: string[];
  /** event contents */
  content: string[];
  /** event place */
  place?: string;
  /** img src */
  imgSrc?: string;
  /** img position */
  imgPosition?: 'top' | 'left';
  /** border */
  border?: boolean;
}

function EventSection({
  title,
  subtitle,
  content,
  place,
  imgSrc = '',
  imgPosition = 'top',
  border = false,
}: Props): React.ReactElement {
  return (
    <S.RootContainer border={border} imgPosition={imgPosition}>
      {imgSrc !== '' && (
        <S.ImgWrapper>
          <S.Img src={imgSrc} />
        </S.ImgWrapper>
      )}
      <S.Container>
        <S.Title>{title}</S.Title>
        {place && <S.Place>{place}</S.Place>}
        <S.ContentContainer>
          {[
            ...subtitle.map((v, i) => {
              return (
                <S.EachContentContainer key={i}>
                  <S.SubTitle>{v}</S.SubTitle>
                  <S.Content>{content[i]}</S.Content>
                </S.EachContentContainer>
              );
            }),
          ]}
        </S.ContentContainer>
      </S.Container>
    </S.RootContainer>
  );
}

export default EventSection;
