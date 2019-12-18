import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const validateDate = (startDate: Moment, endDate: Moment): boolean =>
  startDate.isSameOrBefore(endDate) && startDate.isSameOrAfter(moment());

const convertToDateAt = (date: Moment, time: string): string =>
  `${date.format('YYYY-MM-DD')} ${time}`;

const handleOnFocusChange = (
  target: string,
  focused: boolean | null,
  setFocusStartDate?: React.Dispatch<React.SetStateAction<boolean>>,
  setFocusEndDate?: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  if (focused !== null) {
    switch (target) {
      case 'startDate':
        if (setFocusStartDate) setFocusStartDate(focused);
        break;
      case 'endDate':
        if (setFocusEndDate) setFocusEndDate(focused);
        break;
    }
  }
};
function DateTimePicker({
  range,
  firstLabelName,
  secondLabelName = '종료',
  handleOnChange,
}: Props): React.ReactElement {
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [focusStartDate, setFocusStartDate] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endDate, setEndDate] = useState<Moment | null>(moment());
  const [focusEndDate, setFocusEndDate] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<string>('00:00');
  const isMount = useRef(true);
  let startAt = '';
  let endAt = '';
  if (startDate) startAt = convertToDateAt(startDate, startTime);
  if (endDate) endAt = convertToDateAt(endDate, endTime);
  const valid = !range || validateDate(moment(startAt), moment(endAt));

  const handleOnChangeEffectively = useCallback(
    (startAt: string, endAt: string, valid: boolean) => {
      if (handleOnChange) handleOnChange({ startAt, endAt, valid });
    },
    [handleOnChange],
  );

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
      return;
    }
    handleOnChangeEffectively(startAt, endAt, valid);
  }, [startAt, endAt, valid, handleOnChangeEffectively]);

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
              onFocusChange={({ focused }): void =>
                handleOnFocusChange('startDate', focused, setFocusStartDate)
              }
              id={`${handleOnChange}firstDatePicker`}
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
                onFocusChange={({ focused }): void =>
                  handleOnFocusChange('endDate', focused, setFocusEndDate)
                }
                id={`${handleOnChange}secondsDatePicker`}
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
