import React, { useState, useEffect } from 'react';
import { searchAddressByKeyword } from 'apis';
import * as S from './style';
import { Input, KakaoMap } from 'components';

interface Location {
  latitude: number;
  longitude: number;
}

function SearchMap(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState<Location>({
    latitude: 37.4921311495846,
    longitude: 127.029771111346,
  });

  useEffect(() => {
    if (keyword) search(keyword);
    else setResults([]);
  }, [keyword]);

  const search = async (query: string) => {
    const { data } = await searchAddressByKeyword(query, 4);
    setResults(data.documents);
  };

  const handleKeywordChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeyword(e.target.value);
    setVisible(true);
  };

  const handleClickResult = (
    latitude: number,
    longitude: number,
    roadAddressName: string,
  ) => {
    setVisible(false);
    setKeyword(roadAddressName);
    setLocation({ latitude, longitude });
  };

  return (
    <S.Container>
      <S.SearchContainer>
        <Input
          inputName="searchMap"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="서울 서초구 강남대로 327"
        />
        <S.DropDown visible={visible}>
          {results.map((result, index) => {
            const {
              x: longitude,
              y: latitude,
              road_address_name: roadAddressName,
              place_name: placeName,
            } = result;
            return (
              <S.DropDownItem
                key={index}
                onClick={() =>
                  handleClickResult(latitude, longitude, roadAddressName)
                }
              >
                <S.PlaceName>{placeName}</S.PlaceName>
                <S.RoadAddressName>{roadAddressName}</S.RoadAddressName>
              </S.DropDownItem>
            );
          })}
        </S.DropDown>
      </S.SearchContainer>
      <S.KakaoMapWrapper>
        <KakaoMap {...location} />
      </S.KakaoMapWrapper>
    </S.Container>
  );
}

export default SearchMap;
