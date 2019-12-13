import React, { ReactElement, SyntheticEvent, useState } from 'react';
import * as S from './style';
import {
  ONLY_IMAGE_FILE_INFO,
  IMAGE_UPLOAD_INFO,
} from 'commons/constants/string';

export interface Props {
  onChange?: (data?: string, file?: File) => void;
  height?: string;
}

function ImageSelector({ onChange, height = '20rem' }: Props): ReactElement {
  const [background, setBackground] = useState<string>();

  const onChangeFileInput: (
    e: SyntheticEvent<HTMLInputElement>,
  ) => void = e => {
    const fileList: FileList | null = e.currentTarget.files;
    if (!fileList || !fileList[0]) return;

    const file: File = fileList[0];
    if (!file.type.startsWith('image')) {
      e.currentTarget.value = e.currentTarget.defaultValue;
      return alert(ONLY_IMAGE_FILE_INFO);
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
    <S.Container {...{ background, height }}>
      <S.File type="file" accept="image/*" onChange={onChangeFileInput} />
      <S.Info>{ONLY_IMAGE_FILE_INFO}</S.Info>
      <S.Info>{IMAGE_UPLOAD_INFO}</S.Info>
    </S.Container>
  );
}

export default ImageSelector;
