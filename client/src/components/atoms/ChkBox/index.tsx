import React, { useState } from 'react';

import * as S from './style';
import CheckSvg from 'assets/img/check.svg';

export interface Props {
  checked: boolean;
}

function ChkBox({ checked }: Props): React.ReactElement {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <S.Wrapper
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    >
      {isChecked && <S.ChkIcon alt={'check'} src={CheckSvg} />}
    </S.Wrapper>
  );
}

export default ChkBox;
