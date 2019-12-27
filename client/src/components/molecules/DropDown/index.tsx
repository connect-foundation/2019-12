import React from 'react';
import * as S from './style';

export interface Item {
  title: string;
  desc: string;
  value: any;
}
interface Props {
  visible: boolean;
  items: Item[];
  handleOnClick: ({ title, desc, value }: Item) => void;
}

function DropDown({
  visible,
  items = [],
  handleOnClick,
}: Props): React.ReactElement {
  return (
    <S.DropDown visible={visible}>
      {items.map((item, index) => {
        const { value, title, desc } = item;
        return (
          <S.DropDownItem
            key={index}
            onClick={(): void => handleOnClick({ value, title, desc })}
          >
            <S.ItemTitle>{title}</S.ItemTitle>
            <S.ItemDesc>{desc}</S.ItemDesc>
          </S.DropDownItem>
        );
      })}
    </S.DropDown>
  );
}

export default DropDown;
