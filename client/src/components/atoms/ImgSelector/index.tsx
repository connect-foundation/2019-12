import React, {
  ReactElement,
  useState,
  useRef,
  RefObject,
  useCallback,
} from 'react';
import * as S from './style';
import {
  ONLY_IMG_FILE_INFO,
  IMG_UPLOAD_INFO,
  FILE_NOT_FOUND_ERROR_INFO,
  EXCEEDED_FILE_SIZE_LIMIT,
} from 'commons/constants/string';

export interface Props {
  onChange?: (data?: string, file?: File) => void;
  height?: string;
  maxSize?: number;
}

function clearFileInput(inputRef: RefObject<HTMLInputElement>): void {
  if (!inputRef.current || !inputRef.current.files) return;
  inputRef.current.value = inputRef.current.defaultValue;
}

function readFileOfInput(
  inputRef: RefObject<HTMLInputElement>,
  maxSize?: number,
): Promise<{ data: string; file: File }> {
  return new Promise((resolve, reject) => {
    if (!inputRef.current || !inputRef.current.files)
      return reject(new Error(FILE_NOT_FOUND_ERROR_INFO));

    const file: File = inputRef.current.files[0];

    if (!file) return reject(new Error('NO FILE SELECTED'));

    if (!file.type.startsWith('image')) {
      clearFileInput(inputRef);
      return reject(new Error(ONLY_IMG_FILE_INFO));
    }

    if (maxSize && maxSize <= file.size) {
      clearFileInput(inputRef);
      return reject(new Error(EXCEEDED_FILE_SIZE_LIMIT));
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: ProgressEvent<FileReader>): void => {
      if (!e.target || !e.target.result)
        return reject(new Error(FILE_NOT_FOUND_ERROR_INFO));
      const data: string = e.target.result.toString();
      resolve({ data, file });
    };
  });
}

function ImgSelector({
  onChange,
  height = '20rem',
  maxSize,
}: Props): ReactElement {
  const [background, setBackground] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeFile = useCallback(async () => {
    try {
      const { data, file } = await readFileOfInput(inputRef, maxSize);
      setBackground(data);
      onChange && onChange(data, file);
    } catch (error) {
      if (error.message === 'NO FILE SELECTED') return;
      alert(error.message);
    }
  }, [inputRef, onChange, maxSize]);

  return (
    <S.Container {...{ background, height }}>
      <S.File
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        ref={inputRef}
      />
      <S.Info>{ONLY_IMG_FILE_INFO}</S.Info>
      <S.Info>{IMG_UPLOAD_INFO}</S.Info>
    </S.Container>
  );
}

export default ImgSelector;
