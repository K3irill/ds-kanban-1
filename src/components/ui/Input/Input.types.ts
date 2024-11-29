import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'search' | 'link';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number;
  name?: string;
  label?: string;
  type?: InputType;

  inputSize?: InputSize;
  variant?: InputVariant;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;

  error?: boolean | string;
  disabled?: boolean;
  readOnly?: boolean;
  isRequired?: boolean;

  helperText?: string;
  placeholder?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearIcon?: boolean;

  register?: UseFormRegister<any>;
  rules?: object;

  onClear?: () => void;
  onSearchChange?: (value: string) => void;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
