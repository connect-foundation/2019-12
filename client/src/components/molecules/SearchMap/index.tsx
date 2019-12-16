import React, { useState, useEffect } from 'react';
import { searchAddressByKeyword } from 'apis';
import * as S from './style';
import { Input, KakaoMap } from 'components';
import { useDebounce } from 'hooks';
import DropDown, { Item as DropDownItem } from 'components/molecules/DropDown';

interface Location {
  latitude: number;
  longitude: number;
}
interface SearchResult {
  road_address_name: string;
  place_name: string;
  x: string;
  y: string;
}

export const convertResultsToItems = (items: SearchResult[]): DropDownItem[] =>
  items.map(item => {
    const {
      x: longitude,
      y: latitude,
      road_address_name: title,
      place_name: desc,
    } = item;
    return {
      title,
      desc,
      value: {
        latitude,
        longitude,
      },
    };
  });

function SearchMap(): React.ReactElement {
  const [visible, setVisible] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<DropDownItem[]>([]);
  const [location, setLocation] = useState<Location>({
    latitude: 37.4921311495846,
    longitude: 127.029771111346,
  });
  const debouncedKeyword = useDebounce<string>(keyword, 300);

  useEffect(() => {
    if (debouncedKeyword) search(debouncedKeyword);
    else {
      setResults([]);
      setVisible(false);
    }
  }, [debouncedKeyword]);

  const search = async (query: string) => {
    const { data } = await searchAddressByKeyword(query, 4);
    const dropDownItems = convertResultsToItems(data.documents);
    setResults(dropDownItems);
  };

  const handleKeywordChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeyword(e.target.value);
    setVisible(true);
  };

  const handleClickResult = ({
    title,
    value,
  }: {
    title: string;
    value: {
      latitude: number;
      longitude: number;
    };
  }) => {
    setVisible(false);
    setKeyword(title);
    setLocation(value);
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
        <DropDown
          visible={visible}
          items={results}
          handleOnClick={handleClickResult}
        />
      </S.SearchContainer>
      <S.KakaoMapWrapper>
        <KakaoMap {...location} />
      </S.KakaoMapWrapper>
    </S.Container>
  );
}

export default SearchMap;
