import React, { useState, useEffect } from 'react';

import * as S from './style';
import { LNBItem } from 'components';

export interface Props {
  items: string[];
  tabIndex?: number;
  onTabClicked?: (tabIndex: number) => void;
}

function LNB({ items, tabIndex = 1, onTabClicked }: Props): React.ReactElement {
  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex);

  useEffect(() => {
    setCurrentTabIndex(tabIndex);
  }, [tabIndex]);

  return (
    <S.Container key={currentTabIndex}>
      {items.map((item, index) => (
        <LNBItem
          key={index}
          active={currentTabIndex - 1 === index}
          children={item}
          onClick={(): void => {
            setCurrentTabIndex(index + 1);
            onTabClicked && onTabClicked(index + 1);
          }}
        />
      ))}
    </S.Container>
  );
}

export default LNB;
