import React from 'react';
import GoogleMapReact from 'google-map-react';

import * as S from './style';
import Pin from '../../../assets/img/pin.svg';

const { REACT_APP_GOOGLE_MAP_API_KEY } = process.env;
const defaultZoom = 17;

interface Props {
  /** location */
  location: {
    lat: number;
    lng: number;
  };
}

/*
 const { status, candidates } = await Axios.get(ROUTES.GOOGLE_MAP_API, {
      params: {
        key: REACT_APP_GOOGLE_MAP_API_KEY,
        input: address,
        inputtype: 'textquery',
        language: 'ko',
        fields: 'geometry/location',
      },
    });
    */
function GoogleMap({ location }: Props): React.ReactElement {
  return (
    <S.Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${REACT_APP_GOOGLE_MAP_API_KEY}` }}
        defaultCenter={location}
        defaultZoom={defaultZoom}
      >
        <S.PinIcon alt={'pin'} height={'3rem'} src={Pin} />
      </GoogleMapReact>
    </S.Container>
  );
}

export default GoogleMap;
