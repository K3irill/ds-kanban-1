import React from 'react';

import { FieldError, UseFormRegister } from 'react-hook-form';
import { ILoginData } from '@/types/user.type';
import styles from './Input.module.scss';

type TypeData = ILoginData;

interface PropsInput {
  type: 'password' | 'text';
  placeholder?: string;
  id?: string;
  register: UseFormRegister<TypeData>;
  error?: FieldError | undefined;
  labelText?: string;
  name: string;
}

const Input: React.FC<PropsInput> = ({
  type,
  placeholder = '',
  name,
  register,
  error,
  id = '',
  labelText = '',
}) => (
  <div className={styles.wrapperInput}>
    {labelText && <label htmlFor={id}>{labelText}</label>}
    <input
      className={error && styles.errorInput}
      // @ts-ignore
      {...register(name)}
      name={name}
      placeholder={placeholder}
      id={id}
      type={type}
    />
    {error && <div className={styles.errorMessage}>{error.message}</div>}
  </div>
);

export default Input;
