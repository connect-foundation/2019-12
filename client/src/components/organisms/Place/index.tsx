import React from 'react';

import * as S from './style';
// import { Location } from '../../../types/Data';
import GoogleMap from '../../atoms/GoogleMap';

interface Props {
  place: string;
  address: string;
  placeDesc: string;
  latitude: number;
  longitude: number;
}

function Place({
  place,
  address,
  placeDesc,
  latitude,
  longitude,
}: Props): React.ReactElement {
  return (
    <S.PlaceDetailContainer>
      <GoogleMap {...{ latitude, longitude }} />
      <S.PlcaeLabel>장소</S.PlcaeLabel>
      <S.PlaceName>{place}</S.PlaceName>
      <S.PlaceDetail>{address}</S.PlaceDetail>
      <S.PlaceDetail>{placeDesc}</S.PlaceDetail>
    </S.PlaceDetailContainer>
  );
}

export default Place;
