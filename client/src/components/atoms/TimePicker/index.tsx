import React, { useState, useEffect } from 'react';
import * as S from './style';

interface Props {
  onChange: (time: string) => void;
}

const renderOptions = (): JSX.Element[] =>
  Array.from(Array(24).keys()).map(time => {
    const prefix = time < 12 ? '오전' : '오후';
    const formattedHour = time % 12 >= 10 ? time % 12 : `0${time % 12}`;
    const exactHour = time >= 10 ? time : `0${time}`;
    const displayTime = `${prefix} ${formattedHour}:00`;
    return (
      <option key={time} value={`${exactHour}:00`}>
        {displayTime}
      </option>
    );
  });

function TimePicker({ onChange }: Props): React.ReactElement {
  const [time, setTime] = useState<string>('00:00');
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void =>
    setTime(e.target.value);
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
