import React, { useState } from 'react';
import * as S from './style';

export interface Props {
  children: string | React.ReactElement;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function LNBItem({
  children,
  active = false,
  onClick,
}: Props): React.ReactElement {
  const [isActive, setIsActive] = useState(active);

  return (
    <S.Container
      active={isActive}
      onClick={event => {
        onClick && onClick(event);
        !isActive && setIsActive(true);
      }}
      data-testid={'lnb-item'}
    >
      {children}
    </S.Container>
  );
}

export default LNBItem;
