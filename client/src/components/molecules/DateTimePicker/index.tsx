import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { Label, TimePicker } from 'components';
import { DATE_PICKER_CAPTION } from 'commons/constants/string';
import * as S from './style';

interface Props {
  range: boolean;
  firstLabelName: string;
  secondLabelName?: string;
  handleOnChange?: ({
    startAt,
    endAt,
    valid,
  }: {
    startAt: string;
    endAt?: string;
    valid: boolean;
  }) => void;
}

const validateDate = (startDate: Moment, endDate: Moment) =>
  startDate.isSameOrBefore(endDate);

function DateTimePicker({
  range,
  firstLabelName,
  secondLabelName = '종료',
  handleOnChange,
}: Props): React.ReactElement {
  const [valid, setValid] = useState<boolean>(range ? false : true);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [focusStartDate, setFocusStartDate] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusEndDate, setFocusEndDate] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>('00:00');

  const handleOnFocusChange = (target: string, focused: boolean | null) => {
    if (focused !== null) {
      switch (target) {
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
    let startAt = '';
    let endAt = '';
    if (startDate) startAt = `${startDate.format('YYYY-MM-DD')} ${startTime}`;
    if (endDate) endAt = `${endDate.format('YYYY-MM-DD')} ${endTime}`;
    if (range) setValid(validateDate(moment(startAt), moment(endAt)));
    if (valid && startDate && endDate && handleOnChange)
      handleOnChange({ startAt, endAt, valid });
  }, [startDate, startTime, endDate, endTime, valid, handleOnChange, range]);

  return (
    <S.DateTimePickerContainer>
      <S.FirstDateContainer>
        <S.LabelWrapper>
          <Label name={firstLabelName} />
        </S.LabelWrapper>
        <S.PickerContainer>
          <S.DatePickerWrapper>
            <SingleDatePicker
              date={startDate}
              onDateChange={setStartDate}
              focused={focusStartDate}
              onFocusChange={({ focused }) =>
                handleOnFocusChange('startDate', focused)
              }
              id="firstDatePicker"
              keepFocusOnInput={false}
              keepOpenOnDateSelect={false}
              numberOfMonths={1}
            />
          </S.DatePickerWrapper>
          <S.TimePickerWrapper>
            <TimePicker onChange={setStartTime} />
          </S.TimePickerWrapper>
        </S.PickerContainer>
      </S.FirstDateContainer>
      {range && (
        <S.SecondDateContainer>
          <S.LabelWrapper>
            <Label name={secondLabelName} />
          </S.LabelWrapper>
          <S.PickerContainer>
            <S.DatePickerWrapper>
              <SingleDatePicker
                date={endDate}
                onDateChange={setEndDate}
                focused={focusEndDate}
                onFocusChange={({ focused }) =>
                  handleOnFocusChange('endDate', focused)
                }
                id="secondsDatePicker"
                keepFocusOnInput={false}
                keepOpenOnDateSelect={false}
                numberOfMonths={1}
              />
            </S.DatePickerWrapper>
            <S.TimePickerWrapper>
              <TimePicker onChange={setEndTime} />
            </S.TimePickerWrapper>
          </S.PickerContainer>
        </S.SecondDateContainer>
      )}
      <S.Caption invalid={!valid}>{DATE_PICKER_CAPTION}</S.Caption>
    </S.DateTimePickerContainer>
  );
}

export default DateTimePicker;
