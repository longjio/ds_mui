import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

type DsDatePickerProps = {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  label?: string;
  disabled?: boolean;
};

export function DsDatePicker({ value, onChange, label, disabled, ...props }: DsDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="YYYY-MM-DD"
        value={value}
        onChange={onChange}
        label={label}
        disabled={disabled}
        {...props}
      />
    </LocalizationProvider>
  );
}
