import React, { useEffect, useRef } from 'react';

import * as S from './style';
declare const kakao: any;

interface Props {
  latitude: number;
  longitude: number;
  height?: string;
}
function KakaoMap({
  latitude,
  longitude,
  height = '28rem',
}: Props): React.ReactElement {
  const mapRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const kakaoMap = new kakao.maps.Map(mapRef.current, options);
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(kakaoMap);
  }, [latitude, longitude]);

  return <S.Container ref={mapRef} height={height} />;
}

export default KakaoMap;
