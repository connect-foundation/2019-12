import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import HttpStatus from 'http-status';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_MAP_KEY } from '../../../commons/constants/string';
import ROUTES from '../../../commons/constants/routes';
import * as S from './style';
import Icon from '../Icon';
import Pin from '../../../assets/img/pin.svg';

// default: seoul city hall
const defaultLocation = {
  lat: 37.5662952,
  lng: 126.9779451,
};
const defaultZoom = 17;

interface Props {
  address: string;
}

export async function convertAddressToLocation(address: string) {
  const { status, candidates } = await Axios.get(ROUTES.GOOGLE_MAP_API, {
    params: {
      key: GOOGLE_MAP_KEY,
      input: address,
      inputtype: 'textquery',
      language: 'ko',
      fields: 'geometry/location',
    },
  });

  const { location } = candidates[0].geometry;
  return status === HttpStatus['200'] ? location : defaultLocation;
}

function GoogleMap({ address }: Props): React.ReactElement {
  const [location, setLocation] = useState(defaultLocation);

  useEffect(() => {
    (async function loadLocation() {
      const locationData = defaultLocation;
      // try {
      //   locationData = await convertAddressToLocation(address);
      // } catch (e) {
      //   throw e;
      // }
      setLocation(locationData);
    })();
  }, []);

  return (
    <S.Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
        defaultCenter={location}
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
