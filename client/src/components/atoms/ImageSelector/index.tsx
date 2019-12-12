import React, { ReactElement, SyntheticEvent, useState } from 'react';
import * as S from './style';

export interface Props {
  onChange?: (data?: string, file?: File) => void;
}

function ImageSelector({ onChange }: Props): ReactElement {
  const [background, setBackground] = useState<string>();

  const onChangeFileInput: (
    e: SyntheticEvent<HTMLInputElement>,
  ) => void = e => {
    const fileList: FileList | null = e.currentTarget.files;
    if (!fileList || !fileList[0]) return;

    const file: File = fileList[0];
    if (!file.type.startsWith('image')) {
      e.currentTarget.value = e.currentTarget.defaultValue;
      return alert('이미지 파일만 업로드 가능합니다.');
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target || !e.target.result) return;
      const data: string = e.target.result.toString();
      setBackground(data);
      if (onChange) return onChange(data, file);
    };
  };

  return (
    <S.Wrapper {...{ background }}>
      <S.File type="file" accept="image/*" onChange={onChangeFileInput} />
      <S.Info>이미지 파일만 업로드 가능합니다.</S.Info>
      <S.Info>16:9 비율의 이미지가 가장 잘 어울립니다.</S.Info>
    </S.Wrapper>
  );
}

export default ImageSelector;
