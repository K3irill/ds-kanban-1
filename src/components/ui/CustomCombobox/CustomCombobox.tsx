import cn from 'classnames';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
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
  return (
    <div className={cn(styles['project-kanban__input'])}>
      <label>
        <span>{label}</span>
      </label>
      <Combobox value={value} onChange={onChange} onClose={() => onQueryChange('')}>
        <div className={styles['combobox-container']}>
          <ComboboxInput
            className={styles['combobox-input']}
            displayValue={displayValue}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
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
