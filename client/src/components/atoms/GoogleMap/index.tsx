import React from 'react';
import GoogleMapReact from 'google-map-react';

import * as S from './style';
import Pin from 'assets/img/pin.svg';

const {
  REACT_APP_GOOGLE_MAP_API_KEY,
  STORYBOOK_GOOGLE_MAP_API_KEY,
} = process.env;

const googleApiKey =
  REACT_APP_GOOGLE_MAP_API_KEY || STORYBOOK_GOOGLE_MAP_API_KEY;
const defaultZoom = 17;

interface Props {
  latitude: number;
  longitude: number;
}

function GoogleMap({
  latitude: lat,
  longitude: lng,
}: Props): React.ReactElement {
  return (
    <S.Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleApiKey}` }}
        center={{ lat, lng }}
        defaultZoom={defaultZoom}
        draggable={false}
      >
        <S.PinIcon alt={'pin'} height={'3rem'} src={Pin} />
      </GoogleMapReact>
    </S.Container>
  );
}

export default GoogleMap;
