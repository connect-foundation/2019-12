import React, { useState } from 'react';
import Input, { Props as InputProps } from 'components/atoms/Input';
import numberDecorator from 'utils/numberDecorator';

export function handleNumber(value: string, prefix?: '₩' | '$') {
  const onlyNumber = +value.replace(/[^(\d)]/g, '').slice(0, 7);
  const formattedNumber = numberDecorator({
    mount: onlyNumber,
    currency: prefix,
    separated: true,
  });
  return {
    formattedNumber,
    onlyNumber: onlyNumber.toString(),
  };
}

interface InputOnlyNumberProps extends InputProps {
  prefix?: '₩' | '$';
  handleOnChange?: (value: string) => void;
}
function InputOnlyNumber({
  inputName,
  prefix,
  handleOnChange,
  ...props
}: InputOnlyNumberProps): React.ReactElement {
  const initialNumber = prefix ? `${prefix} 0` : '0';
  const [number, setNumber] = useState<string>(initialNumber);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formattedNumber, onlyNumber } = handleNumber(
      e.target.value,
      prefix,
    );
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
