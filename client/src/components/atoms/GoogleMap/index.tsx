import React from 'react';
import GoogleMapReact from 'google-map-react';

import * as S from './style';
import Pin from '../../../assets/img/pin.svg';

const defaultZoom = 17;
const defaultCenter = { lat: 37.5662952, lng: 126.9779451 };
const {
  REACT_APP_GOOGLE_MAP_API_KEY,
  STORYBOOK_GOOGLE_MAP_API_KEY,
} = process.env;

interface Props {
  latitude: number;
  longitude: number;
}

function GoogleMap({ latitude, longitude }: Props): React.ReactElement {
  const googleApiKey =
    REACT_APP_GOOGLE_MAP_API_KEY || STORYBOOK_GOOGLE_MAP_API_KEY;

  return (
    <S.Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleApiKey}` }}
        center={{ lat: latitude, lng: longitude }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <S.PinIcon alt={'pin'} height={'3rem'} src={Pin} />
      </GoogleMapReact>
    </S.Container>
  );
}

export default GoogleMap;
