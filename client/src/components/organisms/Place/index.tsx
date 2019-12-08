import React from 'react';
import * as S from './style';
import { Location } from 'types/Data';
import { GoogleMap } from 'components';

interface Props {
  place: string;
  address: string;
  placeDesc: string;
  // TODO: latitude, longitude를 받아서 아래에서 묶어서 주면 어떨까 싶음
  // 상위에서 굳이 묶어서 가져와야함,,,
  // 8 Dec by inthewalter
  location: Location;
}

function Place({
  place,
  address,
  placeDesc,
  location,
}: Props): React.ReactElement {
  return (
    <S.PlaceDetailContainer>
      <GoogleMap {...location} />
      <S.PlcaeLabel>장소</S.PlcaeLabel>
      <S.PlaceName>{place}</S.PlaceName>
      <S.PlaceDetail>{address}</S.PlaceDetail>
      <S.PlaceDetail>{placeDesc}</S.PlaceDetail>
    </S.PlaceDetailContainer>
  );
}

export default Place;
