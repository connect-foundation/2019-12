import React from 'react';

import * as S from './style';

interface Props {
  /** 아이콘 소스 */
  iconSrc: any;
  /** hover 아이콘 소스 */
  hoveredIconSrc?: any;
  /** 이미지 소스 */
  circleImgSrc?: any;
  /** 버튼 내용 */
  content: string;
  /** 크기 */
  height?: string;
  /** 아이콘 크기 */
  IconHeight?: string;
  /** button styling type */
  styletype?: string;
  /** click handler */
  onClick?: () => void;
  /** fullid width */
  fullid?: boolean;
}

function IconBtn({
  styletype = 'primary',
  fullid = false,
  IconHeight = '1.5rem',
  ...props
}: Props): React.ReactElement {
  const { circleImgSrc } = props;
  return (
    <S.Container
      fullid={fullid}
      onClick={props.onClick}
      styletype={styletype}
      hoveredIconSrc={props.hoveredIconSrc}
    >
      <S.Wrapper>
        {circleImgSrc && (
          <>
            <S.CircleIconImg
              alt={'icon'}
              circular={true}
              src={circleImgSrc}
              height={`${parseInt(IconHeight) + 2}rem`}
            />
          </>
        )}
        <S.Content>{props.content}</S.Content>
        <S.IconImg alt={'icon'} src={props.iconSrc} height={IconHeight} />
        {props.hoveredIconSrc && (
          <S.HoveredIconImg
            alt={'icon'}
            src={props.hoveredIconSrc}
            height={IconHeight}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
}

export default IconBtn;
