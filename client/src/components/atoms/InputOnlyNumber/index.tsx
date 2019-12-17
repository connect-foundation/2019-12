import React, { useState } from 'react';
import Input, { Props as InputProps } from 'components/atoms/Input';
import numberDecorator from 'utils/numberDecorator';

export function handleNumber(value: string) {
  const onlyNumber = value.replace(/[^(\d)]/g, '').slice(0, 7);
  return {
    formattedNumber: numberDecorator({
      mount: +onlyNumber,
      separated: true,
    }),
    onlyNumber,
  };
}

interface InputOnlyNumberProps extends InputProps {
  prefix?: string;
  handleOnChange?: (value: string) => void;
}
function InputOnlyNumber({
  inputName,
  prefix,
  handleOnChange,
  ...props
}: InputOnlyNumberProps): React.ReactElement {
  const [number, setNumber] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formattedNumber, onlyNumber } = handleNumber(e.target.value);
    if (onlyNumber && handleOnChange) handleOnChange(onlyNumber);
    if (formattedNumber) setNumber(formattedNumber);
  };

  return (
    <Input
      inputName={inputName}
      value={number}
      onChange={onChange}
      {...props}
    />
  );
}

export default InputOnlyNumber;
