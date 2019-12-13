import React from 'react';

import * as S from './style';
import { calculateStringOfDateRange } from 'utils/dateCalculator';
import { getKoreanDateString } from '../../../utils/dateCalculator/index';

interface EventDateProps {
  startAt?: string;
  endAt?: string;
  children?: string;
}

function EventDate({
  startAt,
  endAt,
  children,
}: EventDateProps): React.ReactElement {
  if (startAt && endAt) {
    return <S.Wrapper>{calculateStringOfDateRange(startAt, endAt)}</S.Wrapper>;
  } else if (children) {
    return <S.Wrapper>{getKoreanDateString(children)}</S.Wrapper>;
  } else {
    return <></>;
  }
}

export default EventDate;
