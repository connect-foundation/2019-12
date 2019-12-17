import React, { useEffect, useRef } from 'react';

import * as S from './style';
declare const kakao: any; // for using kakao map sdk

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
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kakaoMapElement = kakaoMapRef.current;
    if (kakaoMapElement) {
      const options = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const kakaoMap = new kakao.maps.Map(kakaoMapElement, options);
      const markerPosition = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(kakaoMap);
    }
  }, [latitude, longitude]);

  return <S.Container ref={kakaoMapRef} height={height} />;
}

export default KakaoMap;
