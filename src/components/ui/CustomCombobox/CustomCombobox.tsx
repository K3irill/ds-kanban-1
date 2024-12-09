import cn from 'classnames';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useEffect, useState } from 'react';
import styles from './CustomCombobox.module.scss';

export default function CustomCombobox({
  label,
  value,
  onChange,
  onQueryChange,
  options,
  displayValue,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isOpen) {
      html.style.overflow = 'hidden';
      html.style.paddingRight = '0';
    } else {
      html.style.overflow = '';
      html.style.paddingRight = '';
    }
    return () => {
      html.style.overflow = '';
      html.style.paddingRight = '';
    };
  }, [isOpen]);

  return (
    <div className={cn(styles['input-container'])}>
      <label className={cn(styles.label)}>
        <span>{label}</span>
      </label>
      <Combobox value={value} onChange={onChange}>
        <div className={styles['combobox-container']}>
          <ComboboxInput
            className={styles['combobox-input']}
            displayValue={displayValue}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
            onClose={() => onQueryChange('')}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
          <ComboboxOptions className={styles['combobox-options']}>
            {options.length === 0 ? (
              <ComboboxOption value="Нет совпадений" disabled className={styles['no-matches']}>
                Нет совпадений
              </ComboboxOption>
            ) : (
              options.map((option) => (
                <ComboboxOption
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    cn(styles['combobox-option'], { [styles.selected]: active })
                  }
                >
                  {option.name}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
