import React from 'react';

import * as S from './style';
import { calculateStringOfDateRange } from 'utils/dateCalculator';

interface EventDateProps {
  startAt: string;
  endAt: string;
}

function EventDate({ startAt, endAt }: EventDateProps): React.ReactElement {
  return <S.Wrapper>{calculateStringOfDateRange(startAt, endAt)}</S.Wrapper>;
}

export default EventDate;
