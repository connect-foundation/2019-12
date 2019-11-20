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
  /** fit to size enable */
  fit?: boolean;
}

function Btn({
  content,
  href,
  to,
  styleType = 'primary',
  grow = false,
  ...props
}: Props): React.ReactElement {
  if (to) {
    return (
      <S.StyledLink to={to} styleType={styleType} {...props}>
        {content}
      </S.StyledLink>
    );
  }
  if (href) {
    return (
      <S.Anchor href={href} styleType={styleType} {...props}>
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
