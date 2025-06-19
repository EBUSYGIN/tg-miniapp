import cn from 'classnames';
import { InputProps } from './Input.props';
import styles from './Input.module.css';

export function Input({
  label,
  error,
  className,
  placeholder,
  ...props
}: InputProps) {
  return (
    <label className={cn(styles.inputBox, className)}>
      {label && <span className={styles.label}>{label}</span>}
      <input placeholder={placeholder} {...props} className={styles.input} />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
