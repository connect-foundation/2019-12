import React, { useState } from 'react';

import * as S from './style';
import CheckSvg from 'assets/img/check.svg';

export interface Props {
  checked: boolean;
  onClick?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function ChkBox({ checked, ...props }: Props): React.ReactElement {
  const [isChecked, setIsChecked] = useState(checked);
  const { onClick } = props;
  return (
    <S.Wrapper
      data-testid={'ticketbox-chkbox'}
      onClick={event => {
        onClick && onClick(event);
        setIsChecked(!isChecked);
      }}
    >
      {isChecked && <S.ChkIcon alt={'check'} src={CheckSvg} />}
    </S.Wrapper>
  );
}

export default ChkBox;
