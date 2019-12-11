import React from 'react';
import GoogleMapReact from 'google-map-react';

import * as S from './style';
import { IoMdPin } from 'react-icons/io';

const {
  REACT_APP_GOOGLE_MAP_API_KEY,
  STORYBOOK_GOOGLE_MAP_API_KEY,
} = process.env;

const googleApiKey =
  REACT_APP_GOOGLE_MAP_API_KEY || STORYBOOK_GOOGLE_MAP_API_KEY;
const defaultZoom = 17;
const defaultCenter = { lat: 37.5662952, lng: 126.9779451 };

interface Props {
  latitude: number;
  longitude: number;
  height?: string;
}

function GoogleMap({
  latitude,
  longitude,
  height = '28rem',
}: Props): React.ReactElement {
  return (
    <S.Container height={height}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${googleApiKey}` }}
        center={{ lat: latitude, lng: longitude }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        draggable={false}
      >
        <IoMdPin size={'3rem'} />
      </GoogleMapReact>
    </S.Container>
  );
}

export default GoogleMap;
