import React, { useState, useEffect } from 'react';
import * as S from './style';

interface Props {
  onChange: (time: string) => void;
}

const renderOptions = () =>
  Array.from(Array(24).keys()).map(time => {
    const prefix = time < 12 ? '오전' : '오후';
    const displayTime = `${prefix} ${time % 12}:00`;
    return <option value={`${time}:00`}>{displayTime}</option>;
  });

function TimePicker({ onChange }: Props): React.ReactElement {
  const [time, setTime] = useState();
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
  };
  useEffect(() => {
    onChange(time);
  }, [onChange, time]);
  return (
    <S.TimePickerSelect
      styletype="transparent"
      name="timePicker"
      onChange={handleOnChange}
    >
      {renderOptions()}
    </S.TimePickerSelect>
  );
}

export default TimePicker;
