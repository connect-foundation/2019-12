import React, { useState } from 'react';
import Input, { Props as InputProps } from 'components/atoms/Input';
import numberDecorator from 'utils/numberDecorator';

export const handleNumber = (value: string) => {
  const onlyString = value.replace(/,/g, '');
  const re = /^[0-9]{0,7}$/;
  if (value === '' || re.test(onlyString))
    return numberDecorator({
      mount: +onlyString,
      separated: true,
    });
};

function InputOnlyNumber({
  inputName,
  onChange,
  ...props
}: InputProps): React.ReactElement {
  const [number, setNumber] = useState<string>('');
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = handleNumber(e.target.value);
    if (formattedNumber) setNumber(formattedNumber);
  };

  return (
    <Input
      inputName={inputName}
      value={number}
      onChange={handleOnChange}
      {...props}
    />
  );
}

export default InputOnlyNumber;
