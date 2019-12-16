import React, { useState, useEffect } from 'react';
import { Moment } from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { Label, TimePicker } from 'components';
import * as S from './style';

interface Props {
  range: boolean;
  firstLabelName: string;
  firstPlaceholder: string;
  secondLabelName?: string;
  secondPlaceholder?: string;
}

const invalidDate = (startDate: Moment | null, endDate: Moment | null) =>
  startDate && endDate && endDate.diff(startDate) < 0;

function DateTimePicker({
  range,
  firstLabelName,
  firstPlaceholder,
  secondLabelName = '종료',
  secondPlaceholder = '종료 날짜',
}: Props): React.ReactElement {
  const [invalid, setInvalid] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [focusStartDate, setFocusStartDate] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusEndDate, setFocusEndDate] = useState<boolean>(false);
  const handleOnFocusChange = (id: string, focused: boolean | null) => {
    if (focused !== null) {
      switch (id) {
        case 'startDate':
          setFocusStartDate(focused);
          break;
        case 'endDate':
          setFocusEndDate(focused);
          break;
      }
    }
  };
  useEffect(() => {
    if (invalidDate(startDate, endDate)) {
      setFocusStartDate(true);
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [endDate, startDate]);
  useEffect(() => {
    if (invalidDate(startDate, endDate)) {
      setFocusEndDate(true);
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [endDate, startDate]);

  return (
    <S.DateTimePickerContainer invalid={invalid}>
      <S.FirstDateContainer>
        <S.LabelWrapper>
          <Label name={firstLabelName} />
        </S.LabelWrapper>
        <SingleDatePicker
          date={startDate}
          onDateChange={date => setStartDate(date)}
          focused={focusStartDate}
          onFocusChange={({ focused }) =>
            handleOnFocusChange('startDate', focused)
          }
          id="firstDatePicker"
          placeholder={firstPlaceholder}
          keepFocusOnInput={false}
          keepOpenOnDateSelect={false}
          numberOfMonths={1}
        />
        <TimePicker onChange={() => {}} />
      </S.FirstDateContainer>
      {range && (
        <S.SecondDateContainer>
          <S.LabelWrapper>
            <Label name={secondLabelName} />
          </S.LabelWrapper>
          <SingleDatePicker
            date={endDate}
            onDateChange={date => setEndDate(date)}
            focused={focusEndDate}
            onFocusChange={({ focused }) =>
              handleOnFocusChange('endDate', focused)
            }
            id="secondsDatePicker"
            placeholder={secondPlaceholder}
            keepFocusOnInput={false}
            keepOpenOnDateSelect={false}
            numberOfMonths={1}
          />
          <TimePicker onChange={() => {}} />
        </S.SecondDateContainer>
      )}
    </S.DateTimePickerContainer>
  );
}

export default DateTimePicker;
