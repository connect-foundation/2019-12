import React from 'react';
import GoogleMapReact from 'google-map-react';

import * as S from './style';
import Icon from '../Icon';
import Pin from '../../../assets/img/pin.svg';

const { REACT_APP_GOOGLE_MAP_API_KEY } = process.env;
const defaultZoom = 17;
const defaultCenter = { lat: 37.5662952, lng: 126.9779451 };

interface Props {
  latitude: number;
  longitude: number;
}

function GoogleMap({ latitude, longitude }: Props): React.ReactElement {
  return (
    <S.Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${REACT_APP_GOOGLE_MAP_API_KEY}` }}
        center={{ lat: latitude, lng: longitude }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
      >
        <Icon
          alt={'pin'}
          height={'3rem'}
          src={Pin}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </GoogleMapReact>
    </S.Container>
  );
}

export default GoogleMap;
