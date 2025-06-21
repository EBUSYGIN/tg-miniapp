import { SelectProps } from './Select.props';
import styles from './Select.module.css';

export function Select({
  placeholder,
  label,
  error,
  options,
  multiple,
  ...props
}: SelectProps) {
  return (
    <label className={styles.selectBox}>
      {label && <span className={styles.label}>{label}</span>}
      <select
        placeholder={placeholder}
        className={styles.select}
        multiple={multiple}
        {...props}
      >
        {!multiple && <option value=''>{placeholder || 'Выберите...'}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
