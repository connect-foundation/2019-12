import React, { useState, useEffect } from 'react';
import * as S from './style';

interface Props {
  onChange: (time: string) => void;
}

const renderOptions = () =>
  Array.from(Array(24).keys()).map(time => {
    const prefix = time < 12 ? '오전' : '오후';
    const displayTime = `${prefix} ${time % 12}:00`;
    return (
      <option key={time} value={`${time}:00`}>
        {displayTime}
      </option>
    );
  });

function TimePicker({ onChange }: Props): React.ReactElement {
  const [time, setTime] = useState<string>('00:00');
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value);
  };
  useEffect(() => {
    onChange(time);
  }, [onChange, time]);
  return (
    <S.TimePickerSelect name="timePicker" onChange={handleOnChange}>
      {renderOptions()}
    </S.TimePickerSelect>
  );
}

export default TimePicker;
