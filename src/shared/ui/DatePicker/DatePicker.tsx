import { DatePickerProps } from './DatePicker.props';
import styles from './DatePicker.module.css';

export function DatePicker({
  label,
  error,
  selectedDates,
  onDateChange,
  placeholder,
  single = false,
  ...props
}: DatePickerProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!date) return;
    if (single) {
      onDateChange([date]);
    } else {
      if (!selectedDates.includes(date)) {
        onDateChange([...selectedDates, date]);
      }
    }
  };

  const removeDate = (dateToRemove: string) => {
    const newDates = selectedDates.filter((date) => date !== dateToRemove);
    onDateChange(newDates);
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
        value={
          single && selectedDates.length > 0 ? selectedDates[0] : undefined
        }
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
