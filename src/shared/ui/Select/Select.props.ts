import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  error?: string;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  multiple?: boolean;
}
