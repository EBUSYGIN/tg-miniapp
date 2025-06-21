import { DatePickerProps } from './DatePicker.props';
import styles from './DatePicker.module.css';

export function DatePicker({
  label,
  error,
  selectedDates,
  onDateChange,
  placeholder,
  ...props
}: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (date) {
      onDateChange(date);
    }
  };

  const removeDate = (dateToRemove: string) => {
    const newDates = selectedDates.filter((date) => date !== dateToRemove);
    // Обновляем все даты, кроме удаляемой
    newDates.forEach((date) => onDateChange(date));
  };

  return (
    <div className={styles.datePickerBox}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type='date'
        className={styles.dateInput}
        onChange={handleDateChange}
        placeholder={placeholder}
        {...props}
      />
      {selectedDates.length > 0 && (
        <div className={styles.selectedDates}>
          {selectedDates.map((date) => (
            <div key={date} className={styles.dateTag}>
              <span>{new Date(date).toLocaleDateString('ru-RU')}</span>
              <button
                type='button'
                onClick={() => removeDate(date)}
                className={styles.removeDate}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
