import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './style';
import { Location } from 'types/Data';
import { Input, KakaoMap } from 'components';

const { REACT_APP_KAKAO_REST_API_KEY } = process.env;

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
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=3`,
      {
        headers: {
          Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_API_KEY}`,
        },
      },
    );
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
              x,
              y,
              road_address_name: roadAddressName,
              place_name: placeName,
            } = result;
            return (
              <S.DropDownItem
                key={index}
                onClick={() => handleClickResult(y, x, roadAddressName)}
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
