import cn from 'classnames';
import { ReactNode } from 'react';
import styles from './TabElement.module.scss';
// ------------------------------------------------------------
/* eslint-disable react/button-has-type */

interface TabElementProps {
  children: string | ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}
export default function TabElement({
  children,
  className,
  isActive,
  type = 'button',
  onClick,
  isDisabled,
}: TabElementProps) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={cn(styles.element, className, { [styles[`element--active`]]: isActive })}
    >
      <span>{children}</span>
    </button>
  );
}
