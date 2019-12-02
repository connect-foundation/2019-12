import React from 'react';

import * as S from './style';
import { calcStringOfDateRange } from 'utils/dateCalculator';

interface EventDateProps {
  startAt: string;
  endAt: string;
}

function EventDate({ startAt, endAt }: EventDateProps): React.ReactElement {
  return <S.Wrapper>{calcStringOfDateRange(startAt, endAt)}</S.Wrapper>;
}

export default EventDate;
