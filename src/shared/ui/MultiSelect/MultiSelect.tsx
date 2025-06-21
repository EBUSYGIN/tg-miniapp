import { useState, useRef, useEffect } from 'react';
import { MultiSelectProps } from './MultiSelect.props';
import styles from './MultiSelect.module.css';

export function MultiSelect({
  label,
  options,
  value = [],
  onChange,
  error,
  placeholder = 'Выберите...',
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    const newSelectedItems = selectedItems.includes(optionValue)
      ? selectedItems.filter((item) => item !== optionValue)
      : [...selectedItems, optionValue];

    setSelectedItems(newSelectedItems);
    onChange?.(newSelectedItems);
  };

  const removeItem = (itemValue: string) => {
    const newSelectedItems = selectedItems.filter((item) => item !== itemValue);
    setSelectedItems(newSelectedItems);
    onChange?.(newSelectedItems);
  };

  const getSelectedLabels = () => {
    return selectedItems.map(
      (value) =>
        options.find((option) => option.value === value)?.label || value
    );
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div className={styles.multiSelectBox}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.container} ref={dropdownRef}>
        <div
          className={`${styles.selector} ${isOpen ? styles.open : ''} ${
            disabled ? styles.disabled : ''
          }`}
          onClick={handleToggle}
        >
          <div className={styles.selectedItems}>
            {selectedItems.length === 0 ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              <div className={styles.selectedTags}>
                {selectedLabels.slice(0, 2).map((label, index) => (
                  <span key={index} className={styles.tag}>
                    {label}
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(selectedItems[index]);
                      }}
                      className={styles.removeTag}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedItems.length > 2 && (
                  <span className={styles.moreCount}>
                    +{selectedItems.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={styles.arrow}>▼</div>
        </div>

        {isOpen && (
          <div className={styles.dropdown}>
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  selectedItems.includes(option.value) ? styles.selected : ''
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                <div className={styles.checkbox}>
                  {selectedItems.includes(option.value) && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </div>
                <span className={styles.optionLabel}>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
