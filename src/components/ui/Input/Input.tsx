import React, { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ILoginData } from '@/types/user.type';
import cn from 'classnames';
import styles from './Input.module.scss';

export type InputStatus = 'warning' | 'error' | 'success';
export type InputType = 'search' | 'password' | 'text' | 'date';

const ICONS = {
  search: `/sprite.svg#inputSearch`,
  eyeOff: `/sprite.svg#eyeOff`,
  warning: `/sprite.svg#warning`,
  error: `/sprite.svg#error`,
  success: `/sprite.svg#success`,
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: InputType;
  status?: InputStatus;
  statusMessage?: string;
  register?: UseFormRegister<ILoginData>;
  error?: FieldError;
  name?: string;
}

const PasswordIcon: React.FC<{ visible: boolean; onToggle: () => void }> = ({
  visible,
  onToggle,
}) => (
  <svg
    className={cn(styles.icon, styles.iconPassword, { [styles.iconActive]: visible })}
    aria-label="Toggle password visibility"
    role="button"
    tabIndex={0}
    onClick={onToggle}
    onMouseDown={(e) => e.preventDefault()}
  >
    <use href={ICONS.eyeOff} />
  </svg>
);

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  className,
  status,
  statusMessage,
  register,
  error,
  name = '',
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPasswordType = type === 'password';

  return (
    <div
      className={cn(styles.inputWrapper, {
        [styles[status as string]]: status,
        [styles.error]: error,
      })}
    >
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={cn(styles.inputContainer, {
          [styles.iconLeft]: type === 'search',
          [styles.iconRight]: isPasswordType,
        })}
      >
        {type === 'search' && (
          <svg className={`${styles.icon} ${styles.iconSearch}`} aria-hidden="true">
            <use href={ICONS.search} />
          </svg>
        )}
        {isPasswordType && (
          <PasswordIcon
            visible={passwordVisible}
            onToggle={() => setPasswordVisible(!passwordVisible)}
          />
        )}
        <input
          className={cn(styles.input, className, { [styles.errorInput]: error })}
          type={isPasswordType ? (passwordVisible ? 'text' : 'password') : type}
          {...(register ? register(name as keyof ILoginData) : {})}
          {...props}
        />
      </div>

      {(statusMessage || error) && (
        <div
          className={cn(styles.statusContainer, {
            [styles.visible]: statusMessage || error,
          })}
        >
          {status && (
            <svg className={styles.statusIcon} aria-hidden="true">
              <use href={ICONS[status]} />
            </svg>
          )}
          <span className={styles.statusMessage}>{error?.message || statusMessage || ' '}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
