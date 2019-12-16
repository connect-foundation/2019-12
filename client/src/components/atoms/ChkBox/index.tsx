import React, { useState } from 'react';

import * as S from './style';
import { FaCheck } from 'react-icons/fa';

export interface Props {
  checked: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isChecked?: boolean,
  ) => void;
}

function ChkBox({ checked, ...props }: Props): React.ReactElement {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const { onClick } = props;
  return (
    <S.Wrapper
      data-testid={'ticketbox-chkbox'}
      onClick={event => {
        onClick && onClick(event, !isChecked);
        setIsChecked(!isChecked);
      }}
    >
      {isChecked && <FaCheck size={'2rem'} color={'black'} />}
    </S.Wrapper>
  );
}

export default ChkBox;
