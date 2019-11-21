import React from 'react';

import * as S from './style';
import Icon from '../../atoms/Icon';

interface Props {
  /** 접근성 대응 */
  alt: string;
  /** 크기 */
  height: string;
  /** 아이콘 소스 */
  src: any;
  /** 버튼 내용 */
  content: string;
  /** button styling type */
  styleType?: string;
  /** click handler */
  onClick: () => void;
}

function IconBtn({
  content,
  styleType = 'primary',
  onClick,
  ...props
}: Props): React.ReactElement {
  return (
    <S.Container onClick={onClick} styleType={styleType}>
      <S.Wrapper>
        <Icon style={{ marginRight: '1rem' }} {...props} />
        <S.Content>{content}</S.Content>
      </S.Wrapper>
    </S.Container>
  );
}

export default IconBtn;
