export interface SelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}
