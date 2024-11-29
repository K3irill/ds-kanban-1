import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { InputProps } from './Input.types';
import styles from './Input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    value,
    name,
    label,
    type = 'text',
    inputSize = 'md',
    variant = 'default',

    className,
    containerClassName,
    labelClassName,
    inputClassName,

    error,
    disabled,
    readOnly,
    isRequired,

    helperText,
    placeholder,

    leftIcon,
    rightIcon,
    clearIcon,

    onClear,
    onSearchChange,
    onFocus,
    onBlur,
    onChange,
    ...rest
  } = props;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const containerClasses = classNames(styles.container, containerClassName);

  const labelClasses = classNames(styles.label, { [styles.required]: isRequired }, labelClassName);

  const inputClasses = classNames(
    styles.input,
    {
      [styles.error]: error,
      [styles.disabled]: disabled,
    },
    className
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        className={inputClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        {...rest}
      />

      {helperText && (
        <span className={classNames(styles.helper, { [styles.errorHelper]: error })}>
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
