import React from 'react';
import * as S from './style';

interface Props {
  content: string;
}

const AccountBtn: React.FC<Props> = ({ content }) => <S.Btn>{content}</S.Btn>;

export default AccountBtn;
