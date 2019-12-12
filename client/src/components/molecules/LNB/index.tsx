import React, { useState } from 'react';

import * as S from './style';
import { LNBItem } from 'components';

export interface Props {
  items: string[];
  tabIndex?: number;
  onTabClicked?: (tabIndex: number) => void;
}

function makeLNBItems(
  items: string[],
  currentTabIndex: number,
  setCurrentTabIndex: (curTabInd: number) => void,
  onTabClicked?: (tabIndex: number) => void,
) {
  return [
    ...items.map((item, index) => {
      return (
        <LNBItem
          key={index}
          active={currentTabIndex - 1 === index}
          children={item}
          onClick={() => {
            setCurrentTabIndex(index + 1);
            onTabClicked && onTabClicked(index + 1);
          }}
        />
      );
    }),
  ];
}

function LNB({ items, tabIndex = 1, onTabClicked }: Props): React.ReactElement {
  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex);

  return (
    <S.Container key={currentTabIndex}>
      {makeLNBItems(items, currentTabIndex, setCurrentTabIndex, onTabClicked)}
    </S.Container>
  );
}

export default LNB;
