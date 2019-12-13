import React from 'react';
import * as S from './style';
import { Location } from 'types/Data';
import { GoogleMap } from 'components';

interface Props {
  place: string;
  address: string;
  placeDesc: string;
  latitude: number;
  longitude: number;
  googleMapHeight?: string;
}

function Place({
  place,
  address,
  placeDesc,
  latitude,
  longitude,
  googleMapHeight,
}: Props): React.ReactElement {
  return (
    <S.PlaceDetailContainer>
      <GoogleMap height={googleMapHeight} {...{ latitude, longitude }} />
      <S.PlcaeLabel>장소</S.PlcaeLabel>
      <S.PlaceName>{place}</S.PlaceName>
      <S.PlaceDetail>{address}</S.PlaceDetail>
      <S.PlaceDetail>{placeDesc}</S.PlaceDetail>
    </S.PlaceDetailContainer>
  );
}

export default Place;
