import React, { useState } from 'react';

import * as S from './style';
import { Props as BtnProps } from 'components/atoms/Btn';
import { IconType } from 'react-icons';

type CustomBtnProps = Omit<BtnProps, 'children'>;

interface Props {
  btnProps: CustomBtnProps;
  /** 아이콘 소스 */
  icon?: IconType;
  /** 버튼 내용 */
  children: string | React.ReactNode;
  /** 기본 아이콘 색상 */
  noneIconColor?: string;
  /** hover 아이콘 소스 */
  hoveredIconColor?: string;
  /** 이미지 소스 */
  circleImgSrc?: string;
  /** 아이콘 크기 */
  IconHeight?: string;
  /** fullid */
  fullid?: boolean;
}

function IconBtn({
  btnProps,
  icon,
  children,
  noneIconColor = '',
  hoveredIconColor = '',
  circleImgSrc,
  IconHeight = '1.5rem',
  fullid = false,
}: Props): React.ReactElement {
  const [iconColor, setIconColor] = useState(noneIconColor);

  return (
    <S.RootWrapper
      fullid={fullid}
      onMouseOver={() => {
        setIconColor(hoveredIconColor);
      }}
      onMouseOut={() => {
        setIconColor(noneIconColor);
      }}
    >
      <S.ContentContainer {...btnProps}>
        <S.ContentContainer>
          {circleImgSrc && (
            <S.CircleIconImg
              alt={'icon'}
              circular={true}
              src={circleImgSrc}
              height={`${parseInt(IconHeight) + 2}rem`}
            />
          )}
          <S.Content>{children}</S.Content>
          {icon && (
            <S.IconWrapper>
              {icon({
                size: IconHeight,
                color: iconColor,
              })}
            </S.IconWrapper>
          )}
        </S.ContentContainer>
      </S.ContentContainer>
    </S.RootWrapper>
  );
}

export default IconBtn;
