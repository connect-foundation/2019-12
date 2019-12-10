import React, { useState } from 'react';
import * as S from './style';

export interface Props {
  children: string | React.ReactElement;
  active?: boolean;
}

function LNBItem({ children, active = false }: Props): React.ReactElement {
  const [isActive, setIsActive] = useState(active);

  return (
    <S.Container
      active={isActive}
      onClick={() => {
        !isActive && setIsActive(true);
      }}
    >
      {children}
    </S.Container>
  );
}

export default LNBItem;
