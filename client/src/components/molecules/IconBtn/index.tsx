import React from 'react';

import * as S from './style';

interface Props {
  /** 접근성 대응 */
  alt: string;
  /** 아이콘 소스 */
  src: any;
  /** 버튼 내용 */
  content: string;
  /** 크기 */
  height?: string;
  /** button styling type */
  styletype?: string;
  /** click handler */
  onClick?: () => void;
  /** fullid width */
  fullid?: boolean;
}

function IconBtn({
  content,
  onClick,
  styletype = 'primary',
  fullid = false,
  ...props
}: Props): React.ReactElement {
  return (
    <S.Container fullid={fullid} onClick={onClick} styletype={styletype}>
      <S.Wrapper>
        <S.IconInBtn {...props} />
        <S.Content>{content}</S.Content>
      </S.Wrapper>
    </S.Container>
  );
}

export default IconBtn;
