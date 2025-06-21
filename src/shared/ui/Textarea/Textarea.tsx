import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";

export function Textarea({
  placeholder,
  label,
  error,
  ...props
}: TextareaProps) {
  return (
    <label className={styles.textareaBox}>
      {label && <span>{label}</span>}
      <textarea
        placeholder={placeholder}
        className={styles.textarea}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
