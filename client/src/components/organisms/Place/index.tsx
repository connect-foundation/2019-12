import React from 'react';
import * as S from './style';
import { Location } from 'types/Data';
import { KakaoMap } from 'components';

interface Props {
  place: string;
  address: string;
  placeDesc: string;
  location: Location;
  googleMapHeight?: string;
}

function Place({
  place,
  address,
  placeDesc,
  location,
  googleMapHeight,
}: Props): React.ReactElement {
  return (
    <S.PlaceDetailContainer>
      <KakaoMap height={googleMapHeight} {...location} />
      <S.PlcaeLabel>장소</S.PlcaeLabel>
      <S.PlaceName>{place}</S.PlaceName>
      <S.PlaceDetail>{address}</S.PlaceDetail>
      <S.PlaceDetail>{placeDesc}</S.PlaceDetail>
    </S.PlaceDetailContainer>
  );
}

export default Place;
