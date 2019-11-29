import React from 'react';
import styled from 'styled-components';
import * as S from './style';

const PrettyWrapper = styled.div`
  padding: 2rem 2rem 2rem 4rem;
`;

export const prettyWrapperDecorator = story => (
  <PrettyWrapper>{story()}</PrettyWrapper>
);

export const infoBody = {
  padding: '0',
  margin: '0',
};

export const infoStory = {
  padding: '3rem',
  boxShadow: '#ccc 2px 2px 4px 2px',
  margin: '4rem 0rem',
};

interface Props {
  content: string;
}

export function Note({ content }: Props): React.ReactElement {
  return (
    <>
      <S.Label>Note :</S.Label>
      <S.Content>{content}</S.Content>
    </>
  );
}
