import React, { useState } from 'react';
import cn from 'classnames';
import { InputProps } from '@/components/ui/Input/Input';
import styles from './Dropdown.module.scss';
/* eslint-disable */
export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface DropdownProps extends Omit<InputProps, 'onChange' | 'type'> {
  options: DropdownOption[];
  onChange: (selected: DropdownOption[]) => void;
  selected?: DropdownOption[];
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected = [],
  onChange,
  label,
  status,
  statusMessage,
  placeholder = 'Выберите...',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<DropdownOption[]>(selected);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOptions((prev) => {
      const alreadySelected = prev.some((o) => o.value === option.value);
      return alreadySelected ? prev.filter((o) => o.value !== option.value) : [...prev, option];
    });
    onChange(selectedOptions);
  };

  return (
    <div className={styles.dropdown}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={cn(styles.inputWrapper, { [styles.open]: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <div className={styles.input}>
          {selectedOptions.map((option) => (
            <span key={option.value} className={styles.chip}>
              {option.label}
              <button
                type="button"
                className={styles.removeButton}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOptionClick(option);
                }}
              >
                ✕
              </button>
            </span>
          ))}
          {selectedOptions.length === 0 && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <ul className={styles.options} role="listbox" onMouseDown={(e) => e.preventDefault()}>
          {options.map((option) => (
            <li
              key={option.value}
              className={cn(styles.option, {
                [styles.selected]: selectedOptions.some((o) => o.value === option.value),
              })}
              role="option"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOptionClick(option);
                }
              }}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedOptions.some((o) => o.value === option.value)}
                readOnly
                aria-checked={selectedOptions.some((o) => o.value === option.value)}
              />
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
