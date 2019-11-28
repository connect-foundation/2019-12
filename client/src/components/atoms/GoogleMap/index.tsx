import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Axios from 'axios';
import HttpStatus from 'http-status';
import GoogleMapReact from 'google-map-react';

import ROUTES from '../../../commons/constants/routes';
import * as S from './style';
import Icon from '../Icon';
import Pin from '../../../assets/img/pin.svg';
import { func } from 'prop-types';

const { REACT_APP_GOOGLE_MAP_API_KEY } = process.env;
const defaultZoom = 17;

interface Props {
  /** location */
  location: {
    lat: number;
    lng: number;
  };
}

function GoogleMap({ location }: Props): React.ReactElement {
  return (
    <S.Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${REACT_APP_GOOGLE_MAP_API_KEY}` }}
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
