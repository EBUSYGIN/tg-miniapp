import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface DatePickerProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
  label?: string;
  selectedDates: string[];
  onDateChange: (date: string) => void;
}
