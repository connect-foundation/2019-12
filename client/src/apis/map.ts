import axios from 'axios';

const { REACT_APP_KAKAO_REST_API_KEY } = process.env;
export const searchAddressByKeyword = (query: string, size = 4) =>
  axios.get(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&size=${size}`,
    {
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_REST_API_KEY}`,
      },
    },
  );
