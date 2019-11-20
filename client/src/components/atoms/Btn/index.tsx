import React from 'react';
import * as S from './style';

interface Props {
  /** 버튼 내용 */
  content: string;
  /** react-router/Link 사용 (내부적인 routing)*/
  to: string;
  /** 외부 링크 */
  href: string;
  /** button styling type (ex. priamry, secondary) */
  styleType?: string;
  /** disabled 여부 */
  disabled?: boolean;
  /** click handler */
  onClick?: () => void;
  /** flex grow enable */
  grow?: boolean;
  /** width fit enable */
  fitWidth?: boolean;
}

function Btn({
  content,
  styleType = 'primary',
  ...props
}: Props): React.ReactElement {
  const { to, href } = props;
  if (to) {
    return (
      <S.StyledLink styleType={styleType} {...props}>
        {content}
      </S.StyledLink>
    );
  }
  if (href) {
    return (
      <S.Anchor styleType={styleType} {...props}>
        {content}
      </S.Anchor>
    );
  }
  return (
    <S.StyledBtn styleType={styleType} {...props}>
      {content}
    </S.StyledBtn>
  );
}
export default Btn;
