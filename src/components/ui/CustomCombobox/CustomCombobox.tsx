import cn from 'classnames';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useState } from 'react';
import styles from './CustomCombobox.module.scss';

interface Option {
  id: number;
  name: string;
}

interface CustomComboboxProps {
  label?: string;
  value?: Option | Option[];
  onChange?: (value: Option | Option[] | null) => void;
  onQueryChange?: (query: string) => void;
  options?: Option[];
  displayValue?: (option: Option) => string;
  placeholder?: string;
  isMulti?: boolean;
}

export default function CustomCombobox({
  isMulti = false,
  label,
  value,
  onChange,
  onQueryChange,
  options = [],
  displayValue = (option) => option.name,
  placeholder,
}: CustomComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedOption: Option) => {
    onChange?.(selectedOption);
  };
  const displayValueString = () => {
    if (isMulti && Array.isArray(value)) {
      return value.map(displayValue).join(', ');
    }
    return value ? displayValue(value) : '';
  };

  return (
    <div className={cn(styles['input-container'])}>
      {label && (
        <label className={cn(styles.label)}>
          <span>{label}</span>
        </label>
      )}
      <Combobox value={value} onChange={handleSelect} multiple={isMulti}>
        <div className={styles['combobox-container']}>
          <ComboboxInput
            className={styles['combobox-input']}
            displayValue={displayValueString}
            onChange={(event) => {
              const query = event.target.value;
              onQueryChange?.(query);
            }}
            placeholder={placeholder}
            onFocus={() => setIsOpen(true)}
          />
          {options && isOpen && (
            <ComboboxOptions className={styles['combobox-options']}>
              {options.length === 0 ? (
                <ComboboxOption value="" disabled className={styles['no-matches']}>
                  Нет совпадений
                </ComboboxOption>
              ) : (
                options.map((option) => {
                  const isSelected =
                    isMulti && Array.isArray(value)
                      ? value.some((v) => v.id === option.id)
                      : value?.id === option.id;

                  return (
                    <ComboboxOption
                      key={option.id}
                      value={option}
                      className={({ active }) =>
                        cn(styles['combobox-option'], {
                          [styles.selected]: isSelected,
                          [styles.active]: active,
                        })
                      }
                    >
                      {isSelected && isMulti && '✔ '}
                      {option.name}
                    </ComboboxOption>
                  );
                })
              )}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
}
