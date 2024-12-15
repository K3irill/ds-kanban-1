import React, { ChangeEvent } from 'react';

import { FieldError, UseFormRegister } from 'react-hook-form';
import { ILoginData } from '@/types/user.type';
import styles from './Input.module.scss';

type TypeData = ILoginData;

interface PropsInput {
  type: 'password' | 'text';
  placeholder?: string;
  id?: string;
  register?: UseFormRegister<TypeData>;
  error?: FieldError | undefined;
  labelText?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  isClear?: boolean;
}

const Input: React.FC<PropsInput> = ({
  type,
  error,
  register,
  onChange,
  onClear,
  isClear = false,
  name = '',
  placeholder = '',
  id = '',
  labelText = '',
  value,
}) => (
  <div className={styles.wrapperInput}>
    {labelText && <label htmlFor={id}>{labelText}</label>}
    <input
      className={error && styles.errorInput}
      // @ts-ignore
      {...(register ? register(name) : {})}
      name={name}
      placeholder={placeholder}
      id={id}
      onChange={(e) => onChange?.(e)}
      type={type}
      value={value}
    />
    {/* кнопка очистить инпут */}
    {isClear && value !== '' && (
      <button onClick={() => onClear?.()} className={styles.clearBtn} type="button">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <use href="/sprite.svg#close" />
        </svg>
      </button>
    )}
    {error && <div className={styles.errorMessage}>{error.message}</div>}
  </div>
);

export default Input;
