import React from 'react';
import * as S from './style';
import { KakaoMap } from 'components';

interface Props {
  place: string;
  address: string;
  placeDesc: string;
  mapHeight?: string;
  latitude: number;
  longitude: number;
}

function Place({
  place,
  address,
  placeDesc,
  latitude,
  longitude,
  mapHeight,
}: Props): React.ReactElement {
  return (
    <S.PlaceDetailContainer>
      <KakaoMap height={mapHeight} {...{ latitude, longitude }} />
      <S.PlcaeLabel>장소</S.PlcaeLabel>
      <S.PlaceName>{place}</S.PlaceName>
      <S.PlaceDetail>{address}</S.PlaceDetail>
      <S.PlaceDetail>{placeDesc}</S.PlaceDetail>
    </S.PlaceDetailContainer>
  );
}

export default Place;
